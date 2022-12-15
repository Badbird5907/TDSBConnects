import 'react-native-gesture-handler';

import React from "react";
import {NativeBaseProvider, StatusBar, useColorMode} from "native-base";
import {customTheme, DARK_BACKGROUND, LIGHT_BACKGROUND} from "./src/theme";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Login from "./src/pages/Login";
import {createStackNavigator} from "@react-navigation/stack";
import {SafeAreaView, StyleSheet, useColorScheme} from "react-native";
import Home from "./src/pages/Home";
import {NavigationContainer} from '@react-navigation/native';
import * as Sentry from "sentry-expo";

const Stack = createStackNavigator();
function App() {
    const colorMode = useColorScheme();
    const bgColor = colorMode === 'dark' ? DARK_BACKGROUND : LIGHT_BACKGROUND;


    // TODO fix Event was skipped as native SDK is not enabled.
    Sentry.init({ // Sentry is a crash/error reporting tool - https://sentry.io/
        dsn: "https://9a4d6f697d8548f3bcdbdc096e139265@o1085784.ingest.sentry.io/4504329084600320",
        // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
        // We recommend adjusting this value in production.

        //debug: true,
        //enableInExpoDevelopment: true
    });

    return (
        <NativeBaseProvider theme={customTheme}>
            <NavigationContainer>
                <SafeAreaProvider>
                    <SafeAreaView style={[styles.container, {backgroundColor: bgColor}]}>
                        <StatusBar
                            barStyle={colorMode === 'dark' ? 'light-content' : 'dark-content'}
                            translucent
                            backgroundColor="transparent"
                        />
                        <Stack.Navigator>
                            <Stack.Screen name="Login" component={Login} options={{
                                headerShown: false,
                            }}/>
                            <Stack.Screen name="Home" component={Home}/>
                        </Stack.Navigator>
                    </SafeAreaView>
                </SafeAreaProvider>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Sentry.Native.wrap(App);
