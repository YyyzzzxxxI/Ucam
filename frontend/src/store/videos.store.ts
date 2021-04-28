import {makeAutoObservable, runInAction} from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IVideo {
    name: string,
}

class VideosStore {
    videos: IVideo[] = []

    videoKey: number = 0    // always increasing

    constructor() {
        makeAutoObservable(this)
    }

    async init() {
        //await AsyncStorage.clear((e) => console.log(e))
        this.videoKey = Number(await AsyncStorage.getItem("videoKey")) || 0
        if (await AsyncStorage.getItem("videos"))
            this.videos = JSON.parse(await AsyncStorage.getItem("videos") || "")
        else this.videos = []

        console.log("Store Videos init:\nvideoKey: ", this.videoKey, "\n", this.videos)
    }

    private async updateAsyncStorage() {
        await AsyncStorage.setItem("videos", JSON.stringify(this.videos))
        await AsyncStorage.setItem("videoKey", this.videoKey.toString())
    }

    async addVideo(name: string) {
        await this.updateAsyncStorage()
        await runInAction(() => {
            this.videos.push({name: name})
            this.videoKey++
        })
        await this.updateAsyncStorage()
        console.log(await AsyncStorage.getItem("videoKey"))
        console.log("Video added to store: ", name)
    }

    getAllVideos(): IVideo[] {
        return this.videos
    }
}

let v = new VideosStore()

export default v