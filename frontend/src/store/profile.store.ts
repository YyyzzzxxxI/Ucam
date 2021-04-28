import {makeAutoObservable, runInAction} from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";


class ProfileStore {
    username = ''
    isLogged = false

    constructor() {
        makeAutoObservable(this)
    }

    async init() {
        this.username = await AsyncStorage.getItem("username") || ""
        console.log("init " + this.username)
    }

    async register(username: string) {
        await AsyncStorage.setItem("username", username)
        runInAction(() => {
            this.username = username
            this.isLogged = true
        })
    }

    async login(username: string) {
        await AsyncStorage.setItem("username", username)
        runInAction(() => {
            this.username = username
            this.isLogged = true
        })
    }

    async erase() {
        await AsyncStorage.clear()
        runInAction(() => {
            this.username = ""
            this.isLogged = false
        })
    }

}

let p = new ProfileStore()
p.init()

export default p