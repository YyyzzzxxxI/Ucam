import React from 'react';
import {BottomNavigation, BottomNavigationTab, Icon} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";


import {Home} from "../../views/Home/Home";
import {Camera} from '../../views/Camera/Camera';
import {Profile} from "../../views/Profile/Profile";
import params from "../../views/params";
import {setStatusBarHidden} from "expo-status-bar";
import {VideoView} from '../../views/VideoView/VideoView';
import profileStore from '../../store/profile.store';
import {View} from "react-native";
import {Login} from "../../views/Profile/Login";
import {Register} from "../../views/Profile/Register";
import {observer} from "mobx-react";


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
    let viewName = state.routeNames[state.index]
    if (viewName == params.CAMERA || viewName == params.VIDEOVIEW) {
        setStatusBarHidden(true, 'slide')
        return <></>
    } else {
        setStatusBarHidden(false, 'slide')
    }

    return (
        <View>
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
        </View>
    )
}

const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name={params.HOME} component={Home}/>
        <Screen name={params.CAMERA} component={Camera}/>
        <Screen name={params.PROFILE} component={Profile}/>
        <Screen name={params.VIDEOVIEW} component={VideoView}/>
    </Navigator>
)

const TabLoginNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name={params.LOGIN} component={Login}/>
    </Navigator>
)

const TabAuthNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name={params.LOGIN} component={Login}/>
        <Screen name={params.REGISTER} component={Register}/>
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
