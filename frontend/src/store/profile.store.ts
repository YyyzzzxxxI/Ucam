import {makeAutoObservable} from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoES from 'crypto-es';

class ProfileStore {
    key = ''        // sha 256

    constructor() {
        makeAutoObservable(this)
    }

    async init() {
        //await AsyncStorage.setItem("key", "")
        this.key = await AsyncStorage.getItem("key") || ""
    }

    async setKey(key) {
        this.key = await CryptoES.SHA256(key).toString()
        await AsyncStorage.setItem("key", this.key)
        return true
    }

    checkKey(key): boolean {
        return CryptoES.SHA256(key).toString() == this.key
    }
}

let p = new ProfileStore()

export default p