import React, {useEffect, useState} from 'react';
import {Fab, FlatList, Icon, Text} from "native-base";
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

    useEffect(() => {
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
        APIService.getTimeTable(date).then((res) => {
            const timetable = res.courseTable;
            console.log('Time Table0: ', JSON.stringify(timetable));
            setData(timetable);
        })
    }

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: bgColor}]}>
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

            <FlatList data={data} renderItem={({item}) =>
                <CourseComponent item={item}/>
            } keyExtractor={item => item.courseKey}/>

            <Fab renderInPortal={false} shadow={2} size="sm"
                 icon={<Icon color="white" as={<MaterialCommunityIcons name={"calendar"}/>} name="plus" size="sm"/>}
                 onPress={() => {
                     showDatepicker();
                     console.log("Pressed");
                 }}
            />
        </SafeAreaView>
    );
};

export default TimeTable;
