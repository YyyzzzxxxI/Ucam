import React, {useEffect} from 'react';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';

import {StatusBar} from 'expo-status-bar';
import {Navbar} from "./src/components/Navbar/Navbar";
import videosStore from "./src/store/videos.store";
import profileStore from "./src/store/profile.store";
import params from "./src/views/params";

export default function App() {

    useEffect(() => {
    }, [])

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
