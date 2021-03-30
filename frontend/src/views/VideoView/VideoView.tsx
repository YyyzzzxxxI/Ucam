import * as FileSystem from 'expo-file-system';
import {Video, AVPlaybackStatus} from 'expo-av';
import VideoPlayer from 'expo-video-player'
import React, {useState, useEffect, useRef} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {Icon} from "@ui-kitten/components";



export const VideoView = (props) => {
    const video = React.useRef(null)
    const [status, setStatus] = React.useState<AVPlaybackStatus>()
    const navigation = useNavigation()
    const isFocused = useIsFocused()


    return (
        <View style={styles.container}>
            {isFocused &&
            <VideoPlayer
                videoProps={{
                    shouldPlay: true,
                    resizeMode: "contain",
                    source: {
                        uri: FileSystem.documentDirectory + props.route.params.name,
                    },
                }}
                inFullscreen={true}
                fullscreenExitIcon={BackIcon}
                switchToPortrait={() => {
                    navigation.goBack()
                }}
            />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    backIcon: {
        width: 50,
        height: 50,
    },
})
