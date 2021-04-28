import {Button, Input} from '@ui-kitten/components';
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
} from 'react-native';
import profileStore from '../../store/profile.store';



export const Register = () => {
    const [username, setUsername] = React.useState<string>()
    const [password, setPassword] = React.useState<string>()
    const [regDisabled, setRegDisabled] = React.useState(false)

    const img = require('../../../assets/camera.png')

    function login(){
        setRegDisabled(true)

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                credentials: 'include'
            },
            body: JSON.stringify({username: username, password: password}),
        }
        fetch('http://6398750230bb.ngrok.io/auth/register', requestOptions)
            .then(res => res.json())
            .then(async data => {
                if (data.username){
                    await profileStore.register(data.username)
                    console.log("Registered: " + data.username)
                }
                else {
                    alert("Something wrong...")
                    setUsername("")
                    setPassword("")
                    setRegDisabled(false)
                }
            })
    }

    return (
        <View style={styles.container}>
            <Image
                source={img}
                style={styles.headingImage}
                resizeMode={"contain"}
            />
            <Text style={styles.greeting}>
                Welcome,
            </Text>
            <Text style={styles.greeting2}>
                sign up to continue
            </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Username"
                    value={username}
                    onChangeText={nextValue => setUsername(nextValue)}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={nextValue => setPassword(nextValue)}
                />
            </View>
            <Button style={styles.login} appearance={"outline"} disabled={regDisabled} onPress={login}>
                Register
            </Button>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: "center",
        paddingTop: 100
    },
    headingImage: {
        width: 50,
        height: 50
    },
    greeting: {
        fontSize: 24,
    },
    greeting2: {
        color: '#666',
        fontSize: 24,
        marginTop: 5,
    },
    inputContainer: {
        marginTop: 20
    },
    login: {
        marginTop: 10,
    }
});
