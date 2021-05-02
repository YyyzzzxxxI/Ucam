import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import {makeAutoObservable, runInAction} from "mobx";
import {profileAsyncStorageItems, videosAsyncStorageItems, videosFolder} from "../views/params";


class ProfileStore {
    username = ''
    isLogged = false
    isFirstLogin = true
    darkMode = false

    constructor() {
        makeAutoObservable(this)
    }

    async init() {
        this.username = await AsyncStorage.getItem(profileAsyncStorageItems.username) || ""
        this.darkMode = !!Number(await AsyncStorage.getItem(profileAsyncStorageItems.darkMode))
        if (this.username != "") this.isFirstLogin = false
        console.log("init " + this.username)
    }

    async register(username: string) {
        await AsyncStorage.setItem(profileAsyncStorageItems.username, username)
        runInAction(() => {
            this.username = username
            this.isLogged = true
        })
    }

    async login(username: string) {
        await AsyncStorage.setItem(profileAsyncStorageItems.username, username)
        runInAction(() => {
            this.username = username
            this.isLogged = true
        })
    }

    async setDarkMode(enabled: boolean) {
        runInAction(() => {
            this.darkMode = enabled
        })
        await AsyncStorage.setItem("darkMode", (+enabled).toString())
    }

    async erase() {
        await AsyncStorage.removeItem(profileAsyncStorageItems.username)
        await AsyncStorage.removeItem(videosAsyncStorageItems.videos)
        await AsyncStorage.removeItem(videosAsyncStorageItems.videoKey)
        if (videosFolder != null) {
            await FileSystem.deleteAsync(videosFolder)
        }
        runInAction(() => {
            this.username = ""
            this.isLogged = false
            this.isFirstLogin = true
            this.darkMode = false
        })
        console.log("Profile and videos erased")
    }

}

let profileStore = new ProfileStore()
profileStore.init()

export {profileStore}