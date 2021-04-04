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

export const Navbar = () => {
    return (
        <NavigationContainer>
            <TabNavigator/>
        </NavigationContainer>
    )
}
