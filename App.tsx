import 'react-native-gesture-handler';

import React from "react";
import {NativeBaseProvider, StatusBar} from "native-base";
import {customTheme, DARK_BACKGROUND, LIGHT_BACKGROUND, styles} from "./src/theme";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {SafeAreaView, useColorScheme} from "react-native";
import Home from "./src/pages/Home";
import {NavigationContainer} from '@react-navigation/native';
import * as Sentry from "sentry-expo";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomDrawer from "./src/components/CustomDrawer";
import TimeTable from "./src/pages/TimeTable";
import Settings from "./src/pages/Settings";
import Login from "./src/pages/Login";

const Drawer = createDrawerNavigator();

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
                        <AppDrawer/>
                    </SafeAreaView>
                </SafeAreaProvider>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

export default Sentry.Native.wrap(App);

function AppDrawer() {
    const colorMode = useColorScheme();
    const bgColor = colorMode === 'dark' ? DARK_BACKGROUND : LIGHT_BACKGROUND;
    const stackOptions = {
        headerStyle: {
            backgroundColor: bgColor,
        },
        headerTitleStyle: {
            color: colorMode === 'dark' ? 'white' : 'black',
        }
    }
    return (
        <Drawer.Navigator initialRouteName={"Home"} screenOptions={{
            headerTintColor: colorMode === 'dark' ? 'white' : 'black',
        }} drawerContent={(props) => <CustomDrawer {...props} />}
        >
            {/* Note to future self, hide items in CustomDrawer.hiddenRoutes x*/}
            <Drawer.Screen name="Home" component={Home} options={stackOptions}/>
            <Drawer.Screen name="Time Table" component={TimeTable} options={stackOptions}/>
            <Drawer.Screen name="Settings" component={Settings} options={stackOptions}/>
            <Drawer.Screen name="Login" component={Login} options={{
                headerShown: false,
                swipeEnabled: false,
            }}/>
        </Drawer.Navigator>
    )
}
