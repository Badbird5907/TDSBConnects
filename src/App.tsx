import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Example from './pages/Example';
import {extendTheme, NativeBaseProvider} from 'native-base';

const Stack = createNativeStackNavigator();

const App = () => {
    const theme = extendTheme({
        config: {
            initialColorMode: 'dark',
        },
    });

    return (
        <NavigationContainer>
            <NativeBaseProvider theme={theme}>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Example} />
                </Stack.Navigator>
            </NativeBaseProvider>
        </NavigationContainer>
    );
};

export default App;
