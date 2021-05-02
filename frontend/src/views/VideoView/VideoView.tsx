import {useIsFocused, useNavigation} from "@react-navigation/native";
import {Icon, Layout} from "@ui-kitten/components";
import VideoPlayer from 'expo-video-player'
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {videosFolder} from "../params";

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export const VideoView = (props) => {
    const navigation = useNavigation()
    const isFocused = useIsFocused()

    return (
        <Layout style={styles.container}>
            {isFocused &&
            <VideoPlayer
                videoProps={{
                    shouldPlay: true,
                    resizeMode: "contain",
                    source: {
                        uri: videosFolder + props.route.params.name,
                    },
                }}
                inFullscreen={true}
                width={screenWidth}
                height={screenHeight}
                fullscreenExitIcon={BackIcon}
                switchToPortrait={() => {
                    navigation.goBack()
                }}
            />
            }
        </Layout>
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
