import * as FileSystem from "expo-file-system";


const views = {
    HOME: 'Home',
    CAMERA: 'Camera',
    PROFILE: 'Profile',
    VIDEOVIEW: "Videoview",
    LOGIN: "Login",
    REGISTER: "Register"
}

const server = {
    SERVER_URI: "http://34.116.209.223/api/"
}

const profileSecureStoreItems = {
    username: "username",
    access_token: "access_token"
}

const profileAsyncStorageItems = {
    darkMode: "darkMode"
}

const videosAsyncStorageItems = {
    videos: "videos",
    videoKey: "videoKey"
}

const videosFolder = FileSystem.documentDirectory + "videos/"


export {views, server, profileSecureStoreItems, profileAsyncStorageItems, videosAsyncStorageItems, videosFolder}

