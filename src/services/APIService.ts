import {TDSBConnectsAPI} from "tdsb-connects-api";
import {UserRequest, UserResponse} from "tdsb-connects-api/build/main/lib/schema/impl/account";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CredentialsService from "./CredentialsService";
import {instanceToPlain, plainToInstance} from "class-transformer";


let tdsbConnects: TDSBConnectsAPI;
let userInfo: UserResponse;
let cachedInfoSuccess: boolean = false;
let firstTime: boolean = true;

class APIService {
    async preInit() {
        firstTime = false;
        const cachedInfo = await AsyncStorage.getItem('cachedData');
        const savedCredentials = await CredentialsService.getCredentials();
        console.log('Cached stuff: ', cachedInfo, savedCredentials);
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
}

export default new APIService();

export {userInfo, cachedInfoSuccess, firstTime};
