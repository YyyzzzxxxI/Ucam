import {Button, Input} from "@ui-kitten/components";
import React, {useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import profileStore from "../../store/profile.store";
import {ConfirmDialog, Dialog} from "react-native-simple-dialogs";
import { Login } from "./Login";


export const Profile = () => {

    const [keyInputVisible, setKeyInputVisible] = React.useState(false)
    const [alertVisible, setAlertVisible] = React.useState(false)
    const [msg, setMsg] = React.useState<string>()



    return (
        <View style={styles.container}>
            <Text>Welcome, {profileStore.username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "center",
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    button: {
        margin: 0,
    },
})