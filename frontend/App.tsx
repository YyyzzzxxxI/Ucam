import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from "@ui-kitten/eva-icons";

import {StatusBar} from 'expo-status-bar';
import {observer} from "mobx-react"
import React from 'react';
import {StyleSheet, View} from "react-native";
import {Navbar} from "./src/components/Navbar/Navbar";
import {profileStore} from "./src/store/profile.store"

const AppProvider = observer(() => {
    return (
        <ApplicationProvider  {...eva} theme={profileStore.darkMode ? eva.dark : eva.light}>
            <Navbar/>
        </ApplicationProvider>
    )
})

export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar style={"auto"} translucent={true}/>
            <IconRegistry icons={EvaIconsPack}/>
            <AppProvider/>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1
        }
    }
)
