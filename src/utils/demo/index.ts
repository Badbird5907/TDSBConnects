import {TimetableResponse} from "tdsb-connects-api/build/main/lib/schema/impl/timetable";
import {plainToInstance} from "class-transformer";

const timeTableString = {
    "CourseTable": [{
        "StudentCourse": {
            "ClassCode": "ICS1O1-1",
            "Period": " ",
            "Block": null,
            "TeacherName": "Test Teacher",
            "RoomNo": "204",
            "SchoolCode": "0420",
            "Date": "2023-03-03T00:00:00",
            "CycleDay": 1,
            "StartTime": "2022-12-19T09:00:00",
            "EndTime": "2022-12-19T10:20:00",
            "ClassName": "Computer and Information Science",
            "TeacherEmail": "teacher@tdsb.on.ca",
            "Semester": 1,
            "Term": 1,
            "Timeline": "Regular 1",
            "SchoolYearTrack": null
        },
        "StudentNumber": "300000000",
        "CourseKey": "S:0420-C:ICS1O11-FROM:202303030900-TO:202303031020",
        "AttachedPlanners": [],
        "BaseExceptionString": "",
        "StatusCode": 0,
        "Message": null,
        "HasError": false
    },
        {
            "StudentCourse": {
                "ClassCode": "MPM1O1-1",
                "Period": " ",
                "Block": null,
                "TeacherName": "Test Teacher",
                "RoomNo": "204",
                "SchoolCode": "0420",
                "Date": "2023-03-03T00:00:00",
                "CycleDay": 1,
                "StartTime": "2022-12-19T10:20:00",
                "EndTime": "2022-12-19T11:20:00",
                "ClassName": "Computer and Information Science",
                "TeacherEmail": "teacher@tdsb.on.ca",
                "Semester": 1,
                "Term": 1,
                "Timeline": "Regular 1",
                "SchoolYearTrack": null
            },
            "StudentNumber": "300000000",
            "CourseKey": "S:0420-C:MPM1O11-FROM:202303030900-TO:202303031020",
            "AttachedPlanners": [],
            "BaseExceptionString": "",
            "StatusCode": 0,
            "Message": null,
            "HasError": false
        }
    ],
    "StatusCode": 0,
    "Message": null,
    "HasError": false
}
console.log('Sample demo data: ', timeTableString);
export const demoTimeTable: TimetableResponse = plainToInstance(TimetableResponse, timeTableString);
export const demoUserId = '300000000';
export const demoUserName = 'Demo User';
