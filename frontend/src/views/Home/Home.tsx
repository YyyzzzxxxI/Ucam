import {useNavigation} from "@react-navigation/native";
import {Card, Icon, Layout, List, Text} from '@ui-kitten/components';

import {Video} from 'expo-av';

import {observer} from "mobx-react";
import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from "react-native";
import {ProgressDialog} from 'react-native-simple-dialogs';
import {profileStore} from "../../store/profile.store";
import {IVideo, videosStore} from "../../store/videos.store"
import {videosFolder, views} from "../params";

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;


export const Home = observer(() => {
        const video = React.useRef(null)
        const navigation = useNavigation()

        const [data, setData] = React.useState<IVideo[]>()
        const [alertVisible, setAlertVisible] = React.useState(false)

        let uploadDisabled = false

        useEffect(() => {
            if (profileStore.isFirstLogin) setAlertVisible(true)
            videosStore.init().then(async () => {
                let t = await videosStore.getAllVideos()
                // @ts-ignore
                setData(t)
                setAlertVisible(false)
            })
        }, [])

        const DownloadProgressDialog = observer(() => {
            return (
                <ProgressDialog
                    dialogStyle={styles.alert}
                    visible={alertVisible}
                    title={"Downloading videos from server"}
                    message={"Please, wait...\nDownloading " + videosStore.curDownloadingVideo + "/" + videosStore.downloadingVideosCount}
                >
                </ProgressDialog>
            )
        })

        function onVideoClck(video: IVideo) {
            navigation.navigate(views.VIDEOVIEW, {name: video.name})
        }

        async function onUploadBtnClck(video: IVideo) {
            if (video.isUploaded) {
                alert("Already uploaded!")
                return
            }
            if (!uploadDisabled) {
                uploadDisabled = true
                let error = await videosStore.uploadVideo(video.name)
                uploadDisabled = false
                error ? alert("Something wrong...") : alert("Uploaded!")
                return
            }
        }

        const UploadButton = observer((props) => {
            return (
                <TouchableOpacity
                    style={{alignSelf: 'center'}}
                    onPress={async () => await onUploadBtnClck(props.video)}
                >
                    {props.video.isUploaded ? <UploadedIcon/> : <UploadIcon/>}
                </TouchableOpacity>)
        })

        const renderItem = (data) => (
            <Card
                style={styles.listItem}
            >
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("Home: " + videosFolder + data.item.name)
                            onVideoClck(data.item)
                        }}>
                        <Video
                            ref={video}
                            style={styles.video}
                            source={{uri: videosFolder + data.item.name}}
                            useNativeControls={false}
                            resizeMode="stretch"
                        />
                    </TouchableOpacity>
                    <View style={styles.actions}>
                        <UploadButton video={data.item}/>
                    </View>
                </View>
            </Card>
        );

        return (
            <Layout style={styles.mainContainer}>
                {data?.length == 0 ?
                    <Text style={{textAlign: "center"}}>Record your first video!</Text>
                    :
                    <Layout style={styles.container}>
                        <List
                            style={styles.listContainer}
                            contentContainerStyle={styles.listContentContainer}
                            data={data}
                            renderItem={renderItem}
                        />
                        <DownloadProgressDialog/>
                    </Layout>
                }
            </Layout>
        )
    }
)

const UploadIcon = () => (
    <Icon
        style={styles.uploadIcon}
        fill='#8F9BB3'
        name='cloud-upload-outline'
    />
)

const UploadedIcon = () => (
    <Icon
        style={styles.uploadIcon}
        fill='#8F9BB3'
        name='cloud-upload'
    />
);


const styles = StyleSheet.create(
    {
        mainContainer: {
            flex: 1,
            justifyContent: "center"
        },
        listContainer: {
            flex: 1
        },
        listContentContainer: {
            paddingHorizontal: 8,
            paddingVertical: 20,

        },
        listItem: {
            marginVertical: 5
        },
        container: {
            flex: 1,
            flexDirection: "row",
            borderWidth: 0.5
        },
        actions: {
            flex: 1,
            flexDirection: "column",
            alignSelf: "center"
        },
        uploadIcon: {
            width: 50,
            height: 50
        },
        video: {
            alignSelf: 'flex-start',
            width: screenWidth / 1.9,
            height: screenHeight / 5,
        },
        alert: {
            backgroundColor: "#f4f4f4"
        }
    }
)
