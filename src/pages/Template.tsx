import React from 'react';
import {Text} from "native-base";
import {SafeAreaView, useColorScheme} from "react-native";
import {DARK_BACKGROUND, LIGHT_BACKGROUND, styles} from "../theme";

const Template = ({navigation}: any) => {
    const colorMode = useColorScheme();
    const bgColor = colorMode === 'dark' ? DARK_BACKGROUND : LIGHT_BACKGROUND;
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: bgColor}]}>
            <Text>Template</Text>
        </SafeAreaView>
    );
};

export default Template;
