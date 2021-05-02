import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from '@react-navigation/native';
import {BottomNavigation, BottomNavigationTab, Icon, Layout} from '@ui-kitten/components';
import {setStatusBarHidden} from "expo-status-bar";
import {observer} from "mobx-react";
import React from 'react';
import {profileStore} from '../../store/profile.store';
import {Camera} from '../../views/Camera/Camera';

import {Home} from "../../views/Home/Home";
import {views} from "../../views/params";
import {Login} from "../../views/Profile/Login";
import {Profile} from "../../views/Profile/Profile";
import {Register} from "../../views/Profile/Register";
import {VideoView} from '../../views/VideoView/VideoView';


const HomeIcon = (props: any) => (
    <Icon {...props} name='home-outline'/>
);

const VideoIcon = (props: any) => (
    <Icon {...props} name={'video-outline'}/>
);

const PersonIcon = (props: any) => (
    <Icon {...props} name='person-outline'/>
);

const {Navigator, Screen} = createBottomTabNavigator()


const BottomTabBar = ({navigation, state}: any) => {
    setStatusBarHidden(true, 'slide')

    let viewName = state.routeNames[state.index]
    if (viewName == views.CAMERA || viewName == views.VIDEOVIEW) {
        setStatusBarHidden(true, 'slide')
        return <></>
    } else {
        //setStatusBarHidden(false, 'slide')
    }

    return (
        <Layout style={{borderWidth: 0.5}}>
            {profileStore.username == '' ?
                <BottomNavigation
                    appearance={"noIndicator"}
                    selectedIndex={state.index}
                    onSelect={index => {
                        navigation.navigate(state.routeNames[index])
                    }}>
                    <BottomNavigationTab title={"Login"}/>
                    <BottomNavigationTab title={"Register"}/>
                </BottomNavigation>
                :
                profileStore.isLogged ?
                    <BottomNavigation
                        appearance={"noIndicator"}
                        selectedIndex={state.index}
                        onSelect={index => {
                            navigation.navigate(state.routeNames[index])
                        }}>
                        <BottomNavigationTab icon={HomeIcon}/>
                        <BottomNavigationTab icon={VideoIcon}/>
                        <BottomNavigationTab icon={PersonIcon}/>
                    </BottomNavigation>
                    :
                    <></>
            }
        </Layout>
    )
}

const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name={views.HOME} component={Home}/>
        <Screen name={views.CAMERA} component={Camera}/>
        <Screen name={views.PROFILE} component={Profile}/>
        <Screen name={views.VIDEOVIEW} component={VideoView}/>
    </Navigator>
)

const TabLoginNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name={views.LOGIN} component={Login}/>
    </Navigator>
)

const TabAuthNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name={views.LOGIN} component={Login}/>
        <Screen name={views.REGISTER} component={Register}/>
    </Navigator>
)

let Tab = observer(() => {
        return (
            <NavigationContainer>
                {profileStore.username == '' ?
                    <TabAuthNavigator/> :
                    profileStore.isLogged ?
                        <TabNavigator/>
                        :
                        <TabLoginNavigator/>
                }
            </NavigationContainer>
        )
    }
)

export const Navbar = () => {
    return (
        <Tab/>
    )
}
