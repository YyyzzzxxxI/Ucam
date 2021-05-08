import AsyncStorage from "@react-native-async-storage/async-storage"
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import {makeAutoObservable, runInAction} from "mobx";
import {
    profileAsyncStorageItems,
    profileSecureStoreItems,
    videosAsyncStorageItems,
    videosFolder
} from "../views/params";


class ProfileStore {
    username = ''
    isLogged = false
    isFirstLogin = true

    darkMode = true

    constructor() {
        makeAutoObservable(this)
    }

    async init() {
        this.username = await SecureStore.getItemAsync(profileSecureStoreItems.username) || ""
        this.darkMode = !!Number(await AsyncStorage.getItem(profileAsyncStorageItems.darkMode))
        if (this.username != "") this.isFirstLogin = false
        console.log("init " + this.username)
    }

    async register(username: string) {
        await SecureStore.setItemAsync(profileSecureStoreItems.username, username)
        runInAction(() => {
            this.username = username
            this.isLogged = true
        })
    }

    async login(username: string, access_token: string) {
        await SecureStore.setItemAsync(profileSecureStoreItems.username, username)
        await SecureStore.setItemAsync(profileSecureStoreItems.access_token, access_token)
        runInAction(() => {
            this.username = username
            this.isLogged = true
        })
    }

    async getAccessToken(){
        return await SecureStore.getItemAsync(profileSecureStoreItems.access_token)
    }

    async setDarkMode(enabled: boolean) {
        runInAction(() => {
            this.darkMode = enabled
        })
        await AsyncStorage.setItem(profileAsyncStorageItems.darkMode, (+enabled).toString())
    }

    async erase() {
        await SecureStore.deleteItemAsync(profileSecureStoreItems.username)
        await AsyncStorage.removeItem(videosAsyncStorageItems.videos)
        await AsyncStorage.removeItem(videosAsyncStorageItems.videoKey)
        if (videosFolder != null) {
            await FileSystem.deleteAsync(videosFolder)
        }
        runInAction(() => {
            this.username = ""
            this.isLogged = false
            this.isFirstLogin = true
            this.darkMode = true
        })
        console.log("Profile and videos erased")
    }

}

let profileStore = new ProfileStore()
profileStore.init()

export {profileStore}