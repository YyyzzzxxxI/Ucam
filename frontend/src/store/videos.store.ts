import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import {makeAutoObservable, runInAction} from "mobx";
import {server, videosAsyncStorageItems, videosFolder} from "../views/params";
import {profileStore} from "./profile.store";


interface IVideo {
    name: string,
    isUploaded: boolean
}

class VideosStore {
    videos: IVideo[] = []
    videoKey: number = 0    // always increasing

    curDownloadingVideo: number = 0
    downloadingVideosCount: number = 0

    constructor() {
        makeAutoObservable(this)
    }

    async init() {
        if (profileStore.isFirstLogin) {
            console.log("First login")
            await FileSystem.makeDirectoryAsync(videosFolder)
            await this.firstLogin()
        } else {
            this.videoKey = Number(await AsyncStorage.getItem(videosAsyncStorageItems.videoKey)) || 0
            if (await AsyncStorage.getItem(videosAsyncStorageItems.videos))
                this.videos = JSON.parse(await AsyncStorage.getItem(videosAsyncStorageItems.videos) || "")
            else this.videos = []

            console.log("Store Videos init:\nvideoKey: ", this.videoKey, "\n", this.videos)
        }
    }

    async firstLogin() {
        runInAction(() => {
            profileStore.isFirstLogin = false
            this.videos = []
            this.videoKey = 0
        })

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                credentials: 'include'
            },
            body: JSON.stringify({username: profileStore.username}),
        }
        let videosNames: string[] = await fetch(server.SERVER_URI + 'videos/getVideosNames', requestOptions)
            .then(res => res.json())

        if (videosNames[0] == "none") return

        runInAction(() => this.downloadingVideosCount = videosNames.length)

        for (let i = 0; i < videosNames.length; i++) {
            runInAction(() => this.curDownloadingVideo = i)
            let uri = server.SERVER_URI + 'videos/download' + profileStore.username.toString() + "-" + videosNames[i] + ".mov"
            let fileName = videosNames[i] + ".mov"
            await FileSystem.downloadAsync(uri, videosFolder + fileName)
                .then(() => {
                    console.log("Video downloaded from server!")
                    videosStore.addVideo(fileName, true)
                }, (error) => {
                    console.log("Download fail for video: " + error)
                })
        }
        await runInAction(async () => {
            this.videoKey = Number(videosNames[videosNames.length - 1])
            this.curDownloadingVideo = 0
            this.downloadingVideosCount = 0
            await this.updateAsyncStorage()
        })

    }

    private async updateAsyncStorage() {
        await AsyncStorage.setItem(videosAsyncStorageItems.videos, JSON.stringify(this.videos))
        await AsyncStorage.setItem(videosAsyncStorageItems.videoKey, this.videoKey.toString())
    }

    async addVideo(name: string, isUploaded: boolean = false) {
        await this.updateAsyncStorage()
        await runInAction(() => {
            this.videos.push({name: name, isUploaded: isUploaded})
            this.videoKey++
        })
        await this.updateAsyncStorage()
        console.log(await AsyncStorage.getItem(videosAsyncStorageItems.videoKey))
        console.log("Video added to store: ", name)
    }

    async uploadVideo(name: string): Promise<boolean> {
        let formData = new FormData()
        let localUri: string = videosFolder + name
        let serverUri = server.SERVER_URI + 'videos/upload'
        // @ts-ignore
        formData.append('file', {uri: localUri, name: profileStore.username + "-" + name, type: "*"})

        let data = await fetch(serverUri, {
            method: 'POST',
            body: formData,
            headers: {
                'content-type': 'multipart/form-data',
            },
        }).then(res => res.json())

        await runInAction(() => {
            for (let i = 0; i < this.videos.length; i++) {
                if (this.videos[i].name == name) {
                    this.videos[i].isUploaded = true
                    break
                }
            }
        })
        await this.updateAsyncStorage()

        return data.error
    }

    getAllVideos(): IVideo[] {
        return this.videos
    }

    async erase() {
        console.log("Videos erased")
        await AsyncStorage.removeItem(videosAsyncStorageItems.videos)
        await AsyncStorage.removeItem(videosAsyncStorageItems.videoKey)
        runInAction(() => {
            this.videos = []
            this.videoKey = 0
            this.curDownloadingVideo = 0
            this.downloadingVideosCount = 0
        })
    }
}

let videosStore = new VideosStore()

export {IVideo, videosStore}