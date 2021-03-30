import {makeAutoObservable, runInAction} from "mobx";
import * as FileSystem from 'expo-file-system';
import AsyncStorage from "@react-native-async-storage/async-storage";

class Videos {
    videos: string[] = []
    videoKey: number = 0    // always increasing

    constructor() {
        makeAutoObservable(this)
    }

    async init() {
        //await AsyncStorage.clear((e) => console.log(e))
        this.videoKey = Number(await AsyncStorage.getItem("videoKey")) || 0
        let keys = await AsyncStorage.getAllKeys()
        let N = keys.length
        let mov = 4     // .mov = 4 elem
        let videos: string[] = []
        for (let i = 0; i < N; i++) {
            let name = await AsyncStorage.getItem(keys[i]) || ""
            if (name.substr(name.length - mov) == ".mov") {
                videos.push(name)
            }
        }
        await runInAction(()=> {
            this.videos = videos
        })
        console.log("Store Videos init:\nvideoKey: ", this.videoKey, "\n", this.videos)
    }

    async addVideo(name: string) {
        await AsyncStorage.setItem(this.videoKey.toString(), name)
        await runInAction(()=>{
            this.videos.push(name)
            this.videoKey++
        })
        await AsyncStorage.setItem("videoKey", this.videoKey.toString())
        console.log(await AsyncStorage.getItem("videoKey"))
        console.log("Video added to store: ", name)
    }

    getAllVideos() {
        return this.videos
    }
}

let v = new Videos()

export default v