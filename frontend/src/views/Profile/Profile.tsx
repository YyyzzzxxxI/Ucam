import {Button, Layout, Toggle} from "@ui-kitten/components";
import React, {useEffect} from "react";
import {StyleSheet, View} from "react-native";
import {profileStore} from "../../store/profile.store";


export const Profile = () => {
    const [eraseDisabled, setEraseDisabled] = React.useState(false)
    const [checked, setChecked] = React.useState(false);

    useEffect(() => {
        setChecked(profileStore.darkMode)
    }, [])

    const onCheckedChange = async (isChecked) => {
        setChecked(isChecked)
        await profileStore.setDarkMode(isChecked)
    };

    async function erase() {
        setEraseDisabled(true)
        await profileStore.erase()
    }

    return (
        <Layout style={styles.mainContainer}>

            <Toggle
                style={styles.theme}
                checked={checked}
                onChange={onCheckedChange}
            >
                {`Dark Mode: ${checked}`}
            </Toggle>

            <View style={styles.erase}>
                <Button
                    appearance={"outline"}
                    status={"danger"}
                    disabled={eraseDisabled}
                    onPress={erase}
                >
                    Erase videos from device and sign out
                </Button>
            </View>

        </Layout>

    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,

        alignItems: "center",
        alignContent: "center",
        justifyContent: "flex-start"
    },
    theme: {
        flex: 10,
        alignSelf: "center"
    },
    erase: {
        flex: 1,
        alignSelf: "center",
        marginBottom: 20
    }
})