import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Button,
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    TouchableOpacity
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as FileSystem from 'expo-file-system';
import {Card, List, ListItem, Text} from '@ui-kitten/components';

import {observer} from "mobx-react";
import videosStore from "../../store/videos.store"


import {Video, AVPlaybackStatus} from 'expo-av';
import params from "../params";
import {useNavigation} from "@react-navigation/native";


export const Home = () => {
    const video = React.useRef(null)
    const [status, setStatus] = React.useState<AVPlaybackStatus>()
    const [data, setData] = React.useState<string[]>()
    const navigation = useNavigation()

    useEffect(() => {
        videosStore.init().then(() => {
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

    const renderItem = (data) => (
        <Card
            style={styles.listItem}
            status='basic'
            header={headerProps => renderItemHeader(headerProps, data)}
            footer={renderItemFooter}>
            <TouchableOpacity
                onPress={() => {
                    console.log("Home: " + FileSystem.documentDirectory + data.item)
                    navigation.navigate(params.VIDEOVIEW, {name: data.item})
                }}>
                <Video
                    ref={video}
                    style={styles.video}
                    source={{uri: FileSystem.documentDirectory + data.item}}
                    useNativeControls={false}
                    resizeMode="stretch"
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
            </TouchableOpacity>
        </Card>
    );


    /*return (
        <SafeAreaView style={styles.container}>
            <Videos/>
        </SafeAreaView>
    );*/
    return (
        <List
            style={styles.listContainer}
            contentContainerStyle={styles.listContentContainer}
            data={data}
            renderItem={renderItem}
        />
    )


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    video: {
        alignSelf: 'flex-start',
        width: Dimensions.get("window").width / 1.9,
        height: Dimensions.get("window").height / 5,
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
