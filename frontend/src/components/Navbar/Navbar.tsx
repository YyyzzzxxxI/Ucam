import React from 'react';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import {View, StyleSheet, StyleProp, ViewStyle} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";


import {Home} from "../../views/Home/Home";
import {Video} from '../../views/Video/Video';
import {Profile} from "../../views/Profile/Profile";
import {Test} from "../../views/Profile/Test";

const HomeIcon = (props: any) => (
    <Icon {...props} name='home-outline'/>
);

const VideoIcon = (props: any) => (
  <Icon {...props} name={'video-outline'}/>
);

const PersonIcon = (props: any) => (
    <Icon {...props} name='person-outline'/>
);

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }: any) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab icon={HomeIcon}/>
        <BottomNavigationTab icon={VideoIcon}/>
        <BottomNavigationTab icon={PersonIcon}/>
    </BottomNavigation>
);

const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name='Home' component={Home}/>
        <Screen name='Video' component={Video}/>
        <Screen name='Profile' component={Test}/>
    </Navigator>
);

export const Navbar = () => {
    return (
        <NavigationContainer>
            <TabNavigator/>
        </NavigationContainer>
    );
};
