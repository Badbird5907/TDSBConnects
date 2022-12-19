import React, {useEffect, useState} from 'react';
import {Box, Button, Center, Fab, FlatList, Heading, HStack, Icon, Skeleton, Stack, Text, VStack} from "native-base";
import {Platform, SafeAreaView, useColorScheme} from "react-native";
import {DARK_BACKGROUND, LIGHT_BACKGROUND, styles} from "../theme";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import APIService from "../services/APIService";
import {Course} from "tdsb-connects-api/build/main/lib/schema/impl/timetable";
import CourseComponent from "../components/CourseComponent";

const TimeTable = () => {
    const colorMode = useColorScheme();
    const bgColor = colorMode === 'dark' ? DARK_BACKGROUND : LIGHT_BACKGROUND;
    const [date, setDate] = React.useState(new Date());
    const [show, setShow] = useState(false);

    const [data, setData] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Updating timetable based on date', date);
        update()
    }, [date]);

    const onDateChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        console.log('Update', currentDate);
        setShow(false)
    };

    const showMode = (currentMode: any) => {
        if (Platform.OS === 'android') {
            setShow(false);
            // for iOS, add a button that closes the picker
        }
    };

    const showDatepicker = () => {
        showMode('date');
        setShow(true);
    };

    const update = () => {
        console.log('Update', date);
        setLoading(true)
        APIService.getTimeTable(date).then((res) => {
            const timetable = res.courseTable;
            setLoading(false)
            console.log('Time Table0: ', JSON.stringify(timetable));
            setData(timetable);
        })
    }

    const next = () => {
        const next = new Date(date);
        next.setDate(next.getDate() + 1);
        setDate(next);
    }

    const prev = () => {
        const next = new Date(date);
        next.setDate(next.getDate() - 1);
        setDate(next);
    }

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: bgColor}]}>
            <Center marginTop={5} marginBottom={5}>
                <HStack space={1}>
                    <Button variant={'unstyled'} size={'lg'} onPress={prev} rightIcon={<Icon as={<MaterialCommunityIcons name={"chevron-left"}/>} />}></Button>
                    <Text fontSize={'4xl'}
                          fontWeight={'bold'}
                    >
                        {date.toDateString()}
                    </Text>
                    <Button variant={'unstyled'} size={'lg'} onPress={next} rightIcon={<Icon as={<MaterialCommunityIcons name={"chevron-right"}/>} />}></Button>
                </HStack>
            </Center>
            {show && (
                <>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        is24Hour={true}
                        onChange={onDateChange}
                    />
                </>
            )}
            {loading ?
                <Center w="100%">
                    <FlatList data={[1,2,3,4]} renderItem={({item}) => (
                        <>
                            <Box alignItems="center" style={{
                                marginTop: 10
                            }}>
                                <Box w={"80"} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                                    borderColor: "coolGray.600",
                                    backgroundColor: "gray.700"
                                }} _web={{
                                    shadow: 2,
                                    borderWidth: 0
                                }} _light={{
                                    backgroundColor: "gray.50"
                                }}>
                                    <Stack p="4" space={3}>
                                        <Stack space={2}>
                                            <Skeleton.Text startColor="gray.400" endColor="gray.500" w="90%" h="10"/>
                                            <Skeleton.Text startColor="gray.400" endColor="gray.500" w="90%" h="10"/>
                                        </Stack>
                                        <Text fontWeight="400">
                                        </Text>
                                    </Stack>
                                </Box>
                            </Box>
                        </>
                    )}/>
                </Center>
                :
                <>
                    {
                        data && data.length > 0 ?
                            <>
                                <FlatList data={data} renderItem={({item}) =>
                                    <CourseComponent item={item}/>
                                } keyExtractor={item => item.courseKey}/>
                            </> :
                            <>
                                <Center>
                                    <Text fontSize={'xl'}>No courses found!</Text>
                                </Center>
                            </>
                    }
                </>
            }

            <Fab renderInPortal={false} shadow={2} size="sm"
                 icon={<Icon color="white" as={<MaterialCommunityIcons name={"calendar"}/>} name="plus" size="sm"/>}
                 onPress={() => {
                     showDatepicker();
                 }}
            />
        </SafeAreaView>
    );
};

export default TimeTable;
