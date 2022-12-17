import React, {useEffect, useState} from 'react';
import {Box, Heading, HStack, Spacer, Stack, Text, VStack} from "native-base";
import {Course, StudentCourse} from "tdsb-connects-api/build/main/lib/schema/impl/timetable";
import {formatDate, momentToTime} from "../utils";

const CourseComponent = (props: any) => {
    const item: Course = props.item;
    const studentCourse: StudentCourse = item.studentCourse;

    //const startTime = formatDate(studentCourse.startTime);
    //const endTime = formatDate(studentCourse.endTime);

    const [startTime, setStartTime] = useState<any>()
    const [endTime, setEndTime] = useState<any>()

    useEffect(() => {
        setStartTime(momentToTime(formatDate(studentCourse.startTime)))
        setEndTime(momentToTime(formatDate(studentCourse.endTime)))
    }, [studentCourse])

    return (
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
                            <Heading size="md" ml="-1">
                                {studentCourse.className}
                            </Heading>
                            <Text fontSize={"md"} fontWeight="500" ml="-0.5" mt="-1" marginTop={1}>
                                {studentCourse.classCode}
                            </Text>
                        </Stack>
                        <Text fontWeight="400">
                            {startTime} - {endTime} | {studentCourse.teacherName}
                        </Text>
                    </Stack>
                </Box>
            </Box>
            {/*
            <Box borderBottomWidth="1" _dark={{
                borderColor: "muted.50"
            }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
                <HStack space={[2, 3]} justifyContent="space-between">
                    <VStack>
                        <Text _dark={{
                            color: "warmGray.50"
                        }} color="coolGray.800" bold>
                            {item.studentCourse.classCode}
                        </Text>
                        <Text color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            {item.studentCourse.className}
                        </Text>
                    </VStack>
                    <Spacer/>
                    <Text fontSize="xs" _dark={{
                        color: "warmGray.50"
                    }} color="coolGray.800" alignSelf="flex-start">
                        Timestamp
                    </Text>
                </HStack>
            </Box>
            */}
        </>
    );
};

export default CourseComponent;
