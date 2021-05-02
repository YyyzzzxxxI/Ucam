import {Button, Input, Layout} from '@ui-kitten/components';
import React from 'react';
import {Image, StyleSheet, Text, View,} from 'react-native';
import {profileStore} from '../../store/profile.store';
import {server} from "../params";


export const Register = () => {
    const [username, setUsername] = React.useState<string>()
    const [password, setPassword] = React.useState<string>()
    const [regDisabled, setRegDisabled] = React.useState(false)

    const img = require('../../../assets/camera.png')

    function login() {
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
        fetch(server.SERVER_URI + 'auth/register', requestOptions)
            .then(res => res.json())
            .then(async data => {
                if (data.username) {
                    await profileStore.register(data.username)
                    console.log("Registered: " + data.username)
                } else {
                    alert("Something wrong...")
                    setUsername("")
                    setPassword("")
                    setRegDisabled(false)
                }
            })
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
                    Welcome,
                </Text>
                <Text style={styles.greeting2}>
                    sign up to continue
                </Text>
                <View style={styles.inputContainer}>
                    {profileStore.username == '' ?
                        <Input
                            placeholder={"Username"}
                            value={username}
                            onChangeText={nextValue => setUsername(nextValue)}
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
                    />
                </View>
                <Button style={styles.register} appearance={"outline"} disabled={regDisabled} onPress={login}>
                    Register
                </Button>
            </View>
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
    register: {
        marginTop: 10,
    },
});