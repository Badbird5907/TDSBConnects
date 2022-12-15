import React from 'react';
import {Fab, Icon, Text} from "native-base";
import {SafeAreaView, useColorScheme} from "react-native";
import {DARK_BACKGROUND, LIGHT_BACKGROUND, styles} from "../theme";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const TimeTable = () => {
    const colorMode = useColorScheme();
    const bgColor = colorMode === 'dark' ? DARK_BACKGROUND : LIGHT_BACKGROUND;
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: bgColor}]}>
            <Text>Time Table</Text>
            <Fab renderInPortal={false} shadow={2} size="sm"
                 icon={<Icon color="white" as={<MaterialCommunityIcons name={"calendar"}/>} name="plus" size="sm"/>}
                 onPress={() => {
                     console.log("Pressed");
                 }}
            />
        </SafeAreaView>
    );
};

export default TimeTable;
