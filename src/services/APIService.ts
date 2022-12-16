import {TDSBConnectsAPI} from "tdsb-connects-api";
import {UserRequest, UserResponse} from "tdsb-connects-api/build/main/lib/schema/impl/account";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CredentialsService from "./CredentialsService";
import {instanceToPlain, plainToInstance} from "class-transformer";
import {TimeTableRequest, TimetableResponse} from "tdsb-connects-api/build/main/lib/schema/impl/timetable";


let tdsbConnects: TDSBConnectsAPI;
let userInfo: UserResponse;
let cachedInfoSuccess: boolean = false;
let firstTime: boolean = true;

let cachedTimeTable: TimetableResponse;
let cachedTimeTableTimestamp: number;

class APIService {
    async preInit() {
        firstTime = false;
        const cachedInfo = await AsyncStorage.getItem('cachedData');
        const savedCredentials = await CredentialsService.getCredentials();
        //console.log('Cached stuff: ', cachedInfo, savedCredentials);
        if (cachedInfo && savedCredentials) {
            cachedInfoSuccess = true;
            const thing = plainToInstance(UserResponse, JSON.parse(cachedInfo));
            userInfo = thing;
            return userInfo;
        }
        return null;
    }

    init(username: string, password: string): Promise<UserResponse> {
        return new Promise((resolve, reject) => {
            tdsbConnects = new TDSBConnectsAPI(username, password, () => { // Callback on ready
                const userRequest = new UserRequest();
                tdsbConnects.call(userRequest).then((response) => {
                    const thing = instanceToPlain(response);
                    AsyncStorage.setItem('cachedData', JSON.stringify(thing));
                    userInfo = response;
                    this.cacheTodayTimeTable()
                    resolve(response);
                }).catch(error => {
                    console.error(error);
                    reject(error);
                })
            });
        });
    }

    getTDSBConnects() {
        return tdsbConnects;
    }

    setTDSBConnects(tdsbConnectsNew: TDSBConnectsAPI) {
        tdsbConnects = tdsbConnectsNew;
    }

    async getTimeTable(date: Date): Promise<TimetableResponse> {
        if (cachedTimeTable) {
            // check if cachedTimeTable is from today
            const today = new Date();
            if (cachedTimeTableTimestamp > today.setHours(0, 0, 0, 0)) {
                console.log('Returning cached timetable');
                return new Promise((resolve, reject) => {
                    resolve(cachedTimeTable);
                });
            }
        }
        if (!tdsbConnects) {
            return new Promise((resolve, reject) => {
                reject('Not logged in');
            });
        }
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dateStr = `${day}${month}${year}`
        return new Promise((resolve, reject) => {
            console.log('School id: ', this.getSchoolId())
            tdsbConnects.call(new TimeTableRequest(this.getSchoolId() + '', dateStr)).then((response) => {
                AsyncStorage.getItem("hiddenClasses").then((hiddenClasses) => {
                    // comma seperated list of class IDs
                    // loop through response.courseTable and check if classCode is in hiddenClasses
                    if (hiddenClasses) {
                        const hiddenClassesList = hiddenClasses.split(',');
                        response.courseTable = response.courseTable.filter((course: any) => {
                            return !hiddenClassesList.includes(course.studentCourse.classCode);
                        });
                    }
                    resolve(response);
                });
            }).catch(error => {
                console.error(error);
                reject(error);
            });
        });
    }

    getSchoolId() {
        return userInfo.getSchoolCode();
    }

    async cacheTodayTimeTable() { // TODO: overhaul this caching system
        const now = new Date();
        if (cachedTimeTableTimestamp > now.setHours(0, 0, 0, 0)) {
            console.log('Already cached today\'s timetable!');
            return;
        }
        console.log('Caching today\'s timetable');
        cachedTimeTableTimestamp = Date.now();
        this.getTimeTable(now).then((response) => {
            cachedTimeTable = response;
            console.log('Cached today\'s timetable!');
        });
    }
}

export default new APIService();

export {userInfo, cachedInfoSuccess, firstTime};
