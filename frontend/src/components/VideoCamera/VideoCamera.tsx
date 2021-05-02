import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Icon} from "@ui-kitten/components";
import {Camera} from 'expo-camera';

import * as FileSystem from 'expo-file-system';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {videosStore} from "../../store/videos.store"
import {videosFolder, views} from "../../views/params";


export const VideoCamera = () => {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const [hasPermission, setHasPermission] = useState<boolean>(false)
    const [cameraRef, setCameraRef] = useState<any>(null)
    const [type, setType] = useState<any>(Camera.Constants.Type.back)
    const [recording, setRecording] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        })();
    }, []);

    async function onRecordBtnClick() {
        if (cameraRef) {
            if (recording) {
                setRecording(false)
                cameraRef.stopRecording()
            } else {
                setRecording(true)
                let {uri} = await cameraRef.recordAsync()
                let fileName = videosStore.videoKey.toString() + ".mov"
                FileSystem.copyAsync({
                    from: uri,
                    to: videosFolder + fileName
                }).then(() => {
                    console.log("Video copied locally!!");
                    videosStore.addVideo(fileName)
                }, (error) => {
                    console.log("CopyFile fail for video: " + error)
                })
            }
        }
    }

    const BackButton = () => {
        return (
            <View style={styles.backButton}>
                <TouchableOpacity
                    onPress={() => {
                        if (recording)
                            alert("Stop recording first!")
                        else
                            navigation.navigate(views.HOME)
                    }}>
                    <BackIcon/>
                </TouchableOpacity>
            </View>
        )
    }

    const FlipButton = () => (
        <View style={styles.flipButton}>
            <TouchableOpacity
                onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                    );
                }}>
                <Text style={{fontSize: 18, color: 'white', alignSelf: "center", textAlign: "center"}}> Flip </Text>
            </TouchableOpacity>
        </View>
    )

    const RecordButton = () => {
        return (
            <View style={styles.recordButton}>
                <TouchableOpacity
                    onPress={async () => await onRecordBtnClick()}
                >
                    {recording ? <RecordingStopIcon/> : <RecordingStartIcon/>}
                </TouchableOpacity>
            </View>
        )
    }

    if (!hasPermission) {
        return (
            <View>
                <Text>No access to camera!</Text>
                <BackButton/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {isFocused &&
            <Camera style={styles.camera} type={type} ref={ref => {
                setCameraRef(ref)
            }}>
                <View style={styles.buttons}>
                    <BackButton/>
                    <RecordButton/>
                    <FlipButton/>
                </View>
            </Camera>
            }
        </View>
    )
}

const BackIcon = () => (
    <Icon
        fill='#8F9BB3'
        name='arrow-ios-back-outline'
    />
)


const RecordingStartIcon = () => (
    <Icon
        fill='#8F9BB3'
        name='play-circle-outline'
    />
)


const RecordingStopIcon = () => (
    <Icon
        fill='#8F9BB3'
        name='stop-circle-outline'
    />
)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        flex: 1,
        justifyContent: "flex-end"
    },
    buttons: {
        flexDirection: "row",
    },
    backButton: {
        flex: 1,
        height: 50,
        width: 50,
        alignSelf: "center"
    },
    recordButton: {
        flex: 1,
        height: 70,
        width: 70,
        alignSelf: "center"
    },
    flipButton: {
        flex: 1,
        alignSelf: "center"
    },
})