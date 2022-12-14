import {TDSBConnectsAPI} from "tdsb-connects-api";
import {UserRequest, UserResponse} from "tdsb-connects-api/build/main/lib/schema/impl/account";


var tdsbConnects: TDSBConnectsAPI;
var userInfo: UserResponse;

class APIService {
    init(username: string, password: string): Promise<UserResponse> {
        return new Promise((resolve, reject) => {
            tdsbConnects = new TDSBConnectsAPI(username, password, ()=> { // Callback on ready
                const userRequest = new UserRequest();
                tdsbConnects.call(userRequest).then((response)=> {
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
