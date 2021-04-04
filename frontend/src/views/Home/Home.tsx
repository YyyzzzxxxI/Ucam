import React, {useEffect} from 'react';
import {ConfirmDialog, Dialog} from 'react-native-simple-dialogs';
import {
    Dimensions,
    StyleSheet,
    View,
    TouchableOpacity, Alert
} from "react-native";

import * as FileSystem from 'expo-file-system';
import {Card, Icon, Input, List, Text} from '@ui-kitten/components';

import {observer} from "mobx-react";
import videosStore from "../../store/videos.store"
import profileStore from "../../store/profile.store";

import {Video, AVPlaybackStatus} from 'expo-av';
import params from "../params";
import {useNavigation} from "@react-navigation/native";

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;


interface IVideo {
    name: string,
    isLocked: boolean
}

export const Home = observer(() => {
    const video = React.useRef(null)
    const [status, setStatus] = React.useState<AVPlaybackStatus>()
    const navigation = useNavigation()

    const [data, setData] = React.useState<IVideo[]>()
    const [keyInputVisible, setKeyInputVisible] = React.useState(false)
    const [isLockBtnClck, setIsLockBtnClck] = React.useState(false)
    const [alertVisible, setAlertVisible] = React.useState(false)
    const [msg, setMsg] = React.useState<string>()
    const [curVideo, setCurVideo] = React.useState<IVideo>()

    useEffect(() => {
        videosStore.init().then(async () => {
            await profileStore.init()
            let t = videosStore.getAllVideos()
            setData(t)
        })
    }, [])

    const renderItemHeader = (headerProps, info) => (
        <></>
    );

    const renderItemFooter = (footerProps) => (
        <></>
    );

    const KeyInputDialog = () => {
        const [key, setKey] = React.useState<string>()
        return (
            <ConfirmDialog
                visible={keyInputVisible}
                title={"Write your password to unlock"}
                positiveButton={{
                    title: "OK",
                    onPress: async () => {
                        if (isLockBtnClck) {
                            let correct = await profileStore.checkKey(key)
                            if (correct) {
                                await videosStore.unLockVideo(curVideo?.name)
                                setKeyInputVisible(false)
                            }
                        } else {
                            let correct = await profileStore.checkKey(key)
                            if (correct) {
                                setKeyInputVisible(false)
                                navigation.navigate(params.VIDEOVIEW, {name: curVideo?.name})
                            }
                        }
                        setKey("")
                    }
                }}
                negativeButton={{
                    title: "Cancel",
                    onPress: () => {
                        setKeyInputVisible(false)
                        setKey("")
                    }
                }}
            >
                <View>
                    <Input
                        placeholder='Password'
                        value={key}
                        onChangeText={nextValue => setKey(nextValue)}
                    />
                </View>
            </ConfirmDialog>
        )
    }

    const Alert = () => {
        return (
            <Dialog
                visible={alertVisible}
                title={msg}
                onTouchOutside={() => setAlertVisible(false)}>
            </Dialog>
        )
    }

    async function onLockBtnClick(video: IVideo) {
        setCurVideo(video)
        setIsLockBtnClck(true)
        if (video.isLocked) {
            setKeyInputVisible(true)
        } else {
            setMsg(await videosStore.lockVideo(curVideo?.name) ? "Locked" : "Error")
            setAlertVisible(true)
        }
    }

    const LockButton = (props) => {
        return (
            <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={async () => await onLockBtnClick(props.video)}
            >
                {props.video.isLocked ? <LockIcon/> : <UnLockIcon/>}
            </TouchableOpacity>)
    }

    function onVideoClck(video: IVideo) {
        setCurVideo(video)
        setIsLockBtnClck(false)
        if (video.isLocked) {
            setKeyInputVisible(true)
        } else navigation.navigate(params.VIDEOVIEW, {name: video.name})
    }

    const renderItem = (data) => (
        <Card
            style={styles.listItem}
            status='basic'
            header={headerProps => renderItemHeader(headerProps, data)}
            footer={renderItemFooter}>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => {
                        console.log("Home: " + FileSystem.documentDirectory + data.item.name)
                        onVideoClck(data.item)
                    }}>
                    <Video
                        ref={video}
                        style={styles.video}
                        source={{uri: FileSystem.documentDirectory + data.item.name}}
                        useNativeControls={false}
                        resizeMode="stretch"
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                </TouchableOpacity>
                <View style={styles.actions}>
                    <Text style={{alignSelf: "center"}}>{data.item.name.substr(0, data.item.name.length - 4)}</Text>
                    <LockButton video={data.item}/>
                </View>
            </View>
        </Card>
    );


    return (
        <View style={styles.container}>
            <List
                style={styles.listContainer}
                contentContainerStyle={styles.listContentContainer}
                data={data}
                renderItem={renderItem}
            />
            <KeyInputDialog/>
            <Alert/>
        </View>
    )
})

const LockIcon = () => (
    <Icon
        style={styles.lockIcon}
        fill='#8F9BB3'
        name='lock-outline'
    />
)

const UnLockIcon = () => (
    <Icon
        style={styles.lockIcon}
        fill='#8F9BB3'
        name='unlock-outline'
    />
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#ecf0f1',
    },
    actions: {
        flex: 1,
        flexDirection: "column",
        alignSelf: "center"
    },
    lockIcon: {
        width: 50,
        height: 50,
    },
    video: {
        alignSelf: 'flex-start',
        width: screenWidth / 1.9,
        height: screenHeight / 5,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videos: {
        margin: 5
    },
    listContainer: {
        flex: 1,
    },
    listContentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    listItem: {
        marginVertical: 4,
    },
})
