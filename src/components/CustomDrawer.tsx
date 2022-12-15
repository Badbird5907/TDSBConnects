import React from "react";
import {DrawerContentScrollView,} from "@react-navigation/drawer";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Box, Divider, HStack, Icon, Pressable, Text, VStack,} from "native-base";
import {DARK_BACKGROUND, LIGHT_BACKGROUND} from "../theme";
import APIService, {userInfo} from "../services/APIService";
import {useColorScheme} from "react-native";

const getIcon = (screenName: string) => {
    switch (screenName) {
        case "Home":
            return "home";
        case "Time Table":
            return "timetable";
        default:
            return undefined;
    }
};

const hiddenRoutes = ['Login']

export default function CustomDrawer(props: any) {
    const colorMode = useColorScheme();
    const bgColor = colorMode === 'dark' ? DARK_BACKGROUND : LIGHT_BACKGROUND;
    const textColor = colorMode === 'dark' ? 'white' : 'black';
    const secondaryTextColor = colorMode === 'dark' ? 'gray.400' : 'gray.500';

    return (
        <DrawerContentScrollView {...props} style={{
            backgroundColor: bgColor,
        }}>
            <VStack space="6" my="2" mx="1">
                <Box px="4">
                    <Text bold color="gray.700" style={{color: textColor}}>
                        {userInfo?.userName}
                    </Text>
                    <Text fontSize="14" mt="1" color={secondaryTextColor} fontWeight="500">
                        {userInfo?.userId}
                    </Text>
                </Box>
                <VStack divider={<Divider bg={"gray.400"}/>} space="4">
                    <VStack space="3">
                        {props.state.routeNames.map((name: any, index: any) => {
                            if (hiddenRoutes.includes(name)) {
                                return null;
                            }
                            return (
                                <Pressable
                                    px="5"
                                    py="3"
                                    rounded="md"
                                    bg={
                                        index === props.state.index
                                            ? "rgba(6, 182, 212, 0.1)"
                                            : "transparent"
                                    }
                                    onPress={(event) => {
                                        props.navigation.navigate(name);
                                    }}
                                    key={index}
                                >
                                    <HStack space="7" alignItems="center">
                                        <Icon
                                            color={
                                                index === props.state.index ? "primary.500" : textColor
                                            }
                                            size="5"
                                            as={<MaterialCommunityIcons name={getIcon(name)}/>}
                                        />
                                        <Text
                                            fontWeight="500"
                                            color={
                                                index === props.state.index ? "primary.500" : textColor
                                            }
                                        >
                                            {name}
                                        </Text>
                                    </HStack>
                                </Pressable>
                            )
                        })}
                    </VStack>
                    <VStack space="5">
                        <Text fontWeight="500" fontSize="14" px="5" color={secondaryTextColor}>
                            Actions
                        </Text>
                        <VStack space="3">
                            <Pressable px="5" py="3">
                                <HStack space="7" alignItems="center">
                                    <Icon
                                        color={textColor}
                                        size="5"
                                        as={<MaterialCommunityIcons name="cogs"/>}
                                    />
                                    <Text style={{color: textColor}} fontWeight="500">
                                        Settings
                                    </Text>
                                </HStack>
                            </Pressable>
                            <Pressable px="5" py="3">
                                <HStack space="7" alignItems="center">
                                    <Icon
                                        color={textColor}
                                        size="5"
                                        as={<MaterialCommunityIcons name="logout"/>}
                                    />
                                    <Text style={{color: textColor}} fontWeight="500">
                                        Log Out
                                    </Text>
                                </HStack>
                            </Pressable>
                        </VStack>
                    </VStack>
                </VStack>
            </VStack>
        </DrawerContentScrollView>
    );
}
