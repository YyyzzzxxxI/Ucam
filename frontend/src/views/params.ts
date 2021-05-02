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
    SERVER_URI: "http://a3420502c5bb.ngrok.io/"
}

const profileAsyncStorageItems = {
    username: "username",
    darkMode: "darkMode"
}

const videosAsyncStorageItems = {
    videos: "videos",
    videoKey: "videoKey"
}

const videosFolder = FileSystem.documentDirectory + "videos/"


export {views, server, profileAsyncStorageItems, videosAsyncStorageItems, videosFolder}

