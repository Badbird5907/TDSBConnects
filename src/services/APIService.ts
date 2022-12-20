import {TDSBConnectsAPI} from "tdsb-connects-api";
import {UserRequest, UserResponse} from "tdsb-connects-api/build/main/lib/schema/impl/account";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CredentialsService from "./CredentialsService";
import {instanceToPlain, plainToInstance} from "class-transformer";
import {TimeTableRequest, TimetableResponse} from "tdsb-connects-api/build/main/lib/schema/impl/timetable";
import {formatSmallDate} from "../utils";
import {demoTimeTable} from "../utils/demo";


let tdsbConnects: TDSBConnectsAPI;
let userInfo: UserResponse;
let cachedInfoSuccess: boolean = false;
let firstTime: boolean = true as boolean;

let cachedTimeTable: TimetableResponse;
let cachedTimeTableDate: number,
    cachedTimeTableMonth: number,
    cachedTimeTableYear: number;

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
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('settings_demo').then((demo) => {
                const demoBool = demo === 'true';
                if (demoBool) {
                    resolve(demoTimeTable);
                    return;
                }
                if (cachedTimeTable) {
                    // check if cachedTimeTable is from today
                    const today = new Date();
                    if (cachedTimeTable && cachedTimeTableDate === date.getDate() && cachedTimeTableMonth === date.getMonth() && cachedTimeTableYear === date.getFullYear()) {
                        console.log('Returning cached timetable');
                        resolve(cachedTimeTable);
                        return;
                    }
                }
                if (!tdsbConnects) {
                    reject('Not logged in');
                    return;
                }
                const dateStr = formatSmallDate(date);
                console.log('School id: ', this.getSchoolId())
                tdsbConnects.call(new TimeTableRequest(this.getSchoolId() + '', dateStr)).then((response) => {
                    AsyncStorage.getItem("hiddenClasses").then((hiddenClasses) => {
                        // comma seperated list of class IDs
                        // loop through response.courseTable and check if classCode is in hiddenClasses
                        if (hiddenClasses) {
                            const hiddenClassesList = hiddenClasses.trim().split(',');
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
        })
    }

    getSchoolId() {
        return userInfo.getSchoolCode();
    }

    async cacheTodayTimeTable() { // TODO: overhaul this caching system
        const now = new Date();
        if (cachedTimeTable && cachedTimeTableDate === now.getDate() && cachedTimeTableMonth === now.getMonth() && cachedTimeTableYear === now.getFullYear()) {
            console.log('Already cached today\'s timetable!');
            return;
        }
        console.log('Caching today\'s timetable');
        cachedTimeTableDate = now.getDate();
        cachedTimeTableMonth = now.getMonth();
        cachedTimeTableYear = now.getFullYear();
        this.getTimeTable(now).then((response) => {
            cachedTimeTable = response;
            console.log('Cached today\'s timetable!');
        });
    }

    async clearData() { // lmfao the ts ignores below
        await AsyncStorage.removeItem('cachedData');
        // @ts-ignore
        userInfo = undefined;
        cachedInfoSuccess = false;
        // @ts-ignore
        cachedTimeTable = undefined;
        // @ts-ignore
        cachedTimeTableDate = undefined;
        // @ts-ignore
        cachedTimeTableMonth = undefined;
        // @ts-ignore
        cachedTimeTableYear = undefined;
        firstTime = true;
    }
}

export default new APIService();

export {userInfo, cachedInfoSuccess, firstTime, tdsbConnects};
