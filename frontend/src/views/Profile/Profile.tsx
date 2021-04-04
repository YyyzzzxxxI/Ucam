import {Button, Input} from "@ui-kitten/components";
import React, {useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import profileStore from "../../store/profile.store";
import {ConfirmDialog, Dialog} from "react-native-simple-dialogs";


export const Profile = () => {

    const [keyInputVisible, setKeyInputVisible] = React.useState(false)
    const [alertVisible, setAlertVisible] = React.useState(false)
    const [msg, setMsg] = React.useState<string>()

    const KeyInputDialog = () => {
        const [tittle, setTittle] = React.useState<string>()
        const [setting, setSetting] = React.useState<boolean>()
        let key

        useEffect(() => {
            setTittle(profileStore.key == "" ? "Set password" : "Write old password")
            setSetting(profileStore.key == "")
        }, [])

        return (
            <ConfirmDialog
                visible={keyInputVisible}
                title={tittle}
                positiveButton={{
                    title: "OK",
                    onPress: async () => {
                        if (setting) {
                            setMsg(await profileStore.setKey(key) ? "Done!" : "Error")
                            setKeyInputVisible(false)
                            setAlertVisible(true)
                        } else {
                            let correct = await profileStore.checkKey(key)
                            if (correct) {
                                setTittle("Set password")
                                key = ""
                                setSetting(true)
                            } else {
                                setMsg("Wrong password")
                                setKeyInputVisible(false)
                                setAlertVisible(true)
                            }
                        }
                    }
                }}
                negativeButton={{
                    title: "Cancel",
                    onPress: () => {
                        setKeyInputVisible(false)
                        key = ""
                    }
                }}
            >
                <View>
                    <Input
                        placeholder='Password'
                        value={key}
                        onChangeText={nextValue => key = nextValue}
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

    function onPasswBtnClck() {
        setKeyInputVisible(true)
    }

    const PasswBtn = () => {
        let text = profileStore.key == "" ? "Set password" : "Change password"
        return (<Button
                style={styles.button}
                appearance='filled'
                onPress={onPasswBtnClck}
            >
                {text}
            </Button>
        )
    }

    return (
        <View style={styles.container}>
            <PasswBtn/>
            <KeyInputDialog/>
            <Alert/>
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