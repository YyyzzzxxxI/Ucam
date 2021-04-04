import React from 'react';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';

import {StatusBar} from 'expo-status-bar';
import {Navbar} from "./src/components/Navbar/Navbar";

export default function App() {
    return (
        <>
            <StatusBar style={"auto"} translucent={true}/>
            <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider  {...eva} theme={eva.light}>
                <Navbar/>
            </ApplicationProvider>
        </>
    )
}
