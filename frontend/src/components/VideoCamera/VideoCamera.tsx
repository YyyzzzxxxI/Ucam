import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Camera} from 'expo-camera';
import {useIsFocused, useNavigation} from '@react-navigation/native';


import * as FileSystem from 'expo-file-system';
import videosStore from "../../store/videos.store"
import "../../views/params"
import params from "../../views/params";
import {Icon, Button} from "@ui-kitten/components";


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
                    to: FileSystem.documentDirectory + fileName
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
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                    if (recording)
                        alert("Stop recording first!")
                    else
                        navigation.navigate(params.HOME)
                }}>
                <BackIcon/>
            </TouchableOpacity>
        )
    }

    const FlipButton = () => (
        <TouchableOpacity
            style={{
                alignSelf: 'flex-end'
            }}
            onPress={() => {
                setType(
                    type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                );
            }}>
            <Text style={{fontSize: 18, color: 'white'}}> Flip </Text>
        </TouchableOpacity>
    )

    const RecordButton = () => {
        return (
            <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={async () => await onRecordBtnClick()}
            >
                {recording ? <RecordingStopIcon/> : <RecordingStartIcon/>}
            </TouchableOpacity>)
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
            <Camera style={{flex: 1}} type={type} ref={ref => {
                setCameraRef(ref)
            }}>
                <BackButton/>
                <FlipButton/>
                <RecordButton/>
            </Camera>
            }
        </View>
    )
}

const BackIcon = () => (
    <Icon
        style={styles.backIcon}
        fill='#8F9BB3'
        name='arrow-ios-back-outline'
    />
)


const RecordingStartIcon = () => (
    <Icon
        style={styles.recordIcon}
        fill='#8F9BB3'
        name='play-circle-outline'
    />
)


const RecordingStopIcon = () => (
    <Icon
        style={styles.recordIcon}
        fill='#8F9BB3'
        name='stop-circle-outline'
    />
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    recordIcon: {
        flex: 1,
        alignSelf: "flex-end",
        height: 70,
        width: 70,
    },
    backButton: {
        flex: 1,
        alignSelf: "baseline",
        paddingBottom: 10,
        height: 70,
        width: 70
    },
    backIcon: {
        marginTop: 10,
        width: 50,
        height: 50,
    },
})