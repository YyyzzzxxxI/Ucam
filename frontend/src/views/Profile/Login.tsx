import {Button, Input, Layout} from '@ui-kitten/components';
import React from 'react';
import {Image, StyleSheet, Text, View,} from 'react-native';
import {profileStore} from '../../store/profile.store';
import {server} from "../params";


export const Login = () => {
    const [username, setUsername] = React.useState<string>(profileStore.username)
    const [password, setPassword] = React.useState<string>()
    const [loginDisabled, setLoginDisabled] = React.useState(false)
    const [eraseDisabled, setEraseDisabled] = React.useState(false)

    const img = require('../../../assets/camera.png')

    function login() {
        setLoginDisabled(true)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                credentials: 'include'
            },
            body: JSON.stringify({username: username, password: password}),
        }

        fetch(server.SERVER_URI + 'auth/login', requestOptions)
            .then(res => res.json())
            .then(async data => {
                if (data.access_token) {
                    console.log("Logged")
                    console.log("Username: " + username + "\naccess_token: " + data.access_token)
                    await profileStore.login(username, data.access_token)
                } else {
                    alert("Something wrong...")
                    setPassword("")
                    setLoginDisabled(false)
                }
            })
        setLoginDisabled(false)
    }

    async function erase() {
        setEraseDisabled(true)
        await profileStore.erase()
    }

    return (
        <Layout style={styles.container}>
            <View style={styles.form}>
                <Image
                    source={img}
                    style={styles.headingImage}
                    resizeMode={"contain"}
                />
                <Text style={styles.greeting}>
                    Welcome back, {profileStore.username}
                </Text>
                <Text style={styles.greeting2}>
                    sign in to continue
                </Text>
                <View style={styles.inputContainer}>
                    {profileStore.username == '' ?
                        <Input
                            placeholder={"Username"}
                            value={username}
                            onChangeText={nextValue => setUsername(nextValue)}
                            keyboardAppearance='dark'
                        />
                        :
                        <Input
                            value={username}
                            disabled={true}
                        />
                    }
                    <Input
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={nextValue => setPassword(nextValue)}
                        keyboardAppearance='dark'
                    />
                </View>
                <Button style={styles.login} appearance={"outline"} disabled={loginDisabled} onPress={login}>
                    Login
                </Button>
            </View>

            {profileStore.username != '' &&
            <Button style={styles.erase} appearance={"outline"} status={"danger"} disabled={eraseDisabled}
                    onPress={erase}>
                Erase videos from device and sign out
            </Button>
            }
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',

    },
    form: {
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
    },
    erase: {
        marginBottom: 10,
        alignSelf: "center"
    }
});
