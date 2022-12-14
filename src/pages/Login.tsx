import {Box, Button, Center, FormControl, Heading, Input, StatusBar, useToast, VStack} from "native-base";
import React from "react";
import {SafeAreaView, StyleSheet, useColorScheme} from "react-native";
import {DARK_BACKGROUND, LIGHT_BACKGROUND} from "../theme";
import APIService from "../services/APIService";

export default function Login({navigation}: any) {
    const colorMode = useColorScheme();
    const toast = useToast();
    const bgColor = colorMode === 'dark' ? DARK_BACKGROUND : LIGHT_BACKGROUND;

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loggingIn, setLoggingIn] = React.useState(false);

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: bgColor}]}>
            <StatusBar
                barStyle={colorMode === 'dark' ? 'light-content' : 'dark-content'}
                translucent
                backgroundColor="transparent"
            />
            <Center w="100%" h={"100%"}>
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }}>
                        Better TDSB Connects
                    </Heading>
                    <Center w={"100%"}>
                        <Heading mt="1" _dark={{
                            color: "warmGray.200"
                        }} color="coolGray.600" fontWeight="medium" size="xs">
                            Please sign in.
                        </Heading>
                    </Center>
                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>Student ID</FormControl.Label>
                            <Input cursorColor={"white"} onChange={(v) => {
                                setUsername(v.nativeEvent.text)
                            }}/>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input type="password" cursorColor={"white"} onChange={(v) => {
                                setPassword(v.nativeEvent.text)
                            }}/>
                        </FormControl>
                        <Button mt="2" colorScheme="indigo" disabled={loggingIn} onPress={(e) => {
                            setLoggingIn(true);
                            const starredPassword = password.replace(/./g, '*');
                            console.log("Logging in with username: " + username + " and password: " + starredPassword);
                            APIService.init(username, password).then((res) => {
                                console.log("Logged in successfully!", res);
                                setLoggingIn(false);
                                toast.show({
                                    title: "Logged in successfully!",
                                    description: "Login successful!",
                                    duration: 2500,
                                    render: () => {
                                        return <Box bg="green.500" px="2" py="1" rounded="sm" mb={5}>
                                            Login successful!
                                        </Box>;
                                    }
                                });
                                navigation.navigate('Home');
                            }).catch((err) => {
                                setLoggingIn(false);
                                toast.show({
                                    title: "Error",
                                    description: err,
                                    variant: "solid",
                                    duration: 2500,
                                    render: () => {
                                        return <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                                            {err}
                                        </Box>;
                                    }
                                })
                            });
                        }}>
                            Sign in
                        </Button>
                    </VStack>
                </Box>
            </Center>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
