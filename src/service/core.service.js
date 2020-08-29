import axios from "axios";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

import router from "../router.js";
export default class CoreService {
    static login(user) {
        return axios({url: 'http://localhost:9000/api/service/login', data: user, method: 'POST'});
    }

    static register(user) {
        axios({url: 'http://localhost:9000/api/service/register', data: user, method: 'POST'})
    }

    static errorProcessing() {
        this.linkTo('home')
    }

    static linkTo(component){
        router.push({name: component})
    }

    static isUUID (uuid) {
        let s = "" + uuid;
        s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
        return s !== null
    }
}
