import React from "react";
import {StyleSheet, Text, View} from "react-native";


export const Profile = () => {


    return (
        <View style={styles.container}>
            <Text>Profile page</Text>
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

})