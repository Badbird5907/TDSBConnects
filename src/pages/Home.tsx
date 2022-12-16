import React, {useEffect} from 'react';
import {Text, useColorMode, useToast} from "native-base";

import * as Sentry from "sentry-expo";

import {
    Button
} from "native-base";
import APIService, {userInfo, cachedInfoSuccess, firstTime} from "../services/APIService";
import CredentialsService from "../services/CredentialsService";
import {SafeAreaView, useColorScheme} from "react-native";
import {DARK_BACKGROUND, LIGHT_BACKGROUND, styles} from "../theme";

const Home = ({ navigation }: any) => {
    const colorMode = useColorScheme();
    const bgColor = colorMode === 'dark' ? DARK_BACKGROUND : LIGHT_BACKGROUND;
    const toast = useToast();

    const [data, setData] = React.useState(null);

    useEffect(() => {
        if (!firstTime) return
        console.log('Preinit')
        CredentialsService.hasCredentials().then((hasCreds) => {
            if (hasCreds) {
                APIService.preInit().then(res => {
                    //console.log('Preinit res', userInfo)
                    if (res) {
                        console.log('Found cached data!');
                        CredentialsService.getCredentials().then(creds => {
                            if (creds) {
                                const {username, password} = creds;
                                if (!username || !password) {
                                    console.log("No credentials found!");
                                    return;
                                }
                                console.log("Credentials found, attempting to login with them...");
                                APIService.init(username, password).then((res) => {
                                    if (res) {
                                        console.log("Logged in successfully!");
                                        APIService.cacheTodayTimeTable()

                                    } else {
                                        console.log("Failed to log in! Redirecting to login page...");
                                        CredentialsService.clearCredentials().then(() => {
                                            navigation.navigate('Login');
                                        })
                                    }
                                });
                            }
                        });
                    } else {
                        console.log('Redirecting to login');
                        navigation.navigate('Login');
                    }
                })
            } else {
                console.log('Redirecting to login since no credentials saved!');
                navigation.navigate('Login'); // We're doing this because we can't fetch any data without working credentials
            }
        });

    },[]);

    const c = useColorMode();

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: bgColor}]}>
            <Text>Home</Text>
            <Button onPress={()=> {
                toast.show({
                    title: c.colorMode,
                });
                console.log('Color mode: ', c)
            }}>Show color mode</Button>
        </SafeAreaView>
    );
};

export default Home;
