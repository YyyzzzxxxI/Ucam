import React from 'react';
import {StyleSheet} from "react-native";
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';

import {StatusBar} from 'expo-status-bar';
import {Navbar} from "./src/components/Navbar/Navbar";

export default function App() {
    return (
        <>
            <IconRegistry icons={EvaIconsPack}/>

            <ApplicationProvider  {...eva} theme={eva.light}>
                <StatusBar style={"auto"}/>

                <Navbar/>
            </ApplicationProvider>
        </>
    );
}

const styles = StyleSheet.create({
    navbar: {},
})