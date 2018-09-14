import Buildings from './buildings'
import Timetable from './timetable'
import Teachers from './teachers'
import axios from 'axios'
import config from './../../config/index'

export default {
    Buildings,
    Timetable,
    Teachers
}
const yqlUrl = config.dev.yqlUrl;

function getRequest(url, params){
    let paramsString = '';
    if (params) {
        _.forEach(Object.keys(params), (key) => {
            paramsString += `${key}=${params[key]}&`;
        });
    }
    return axios.get(yqlUrl, {
            params: {
                q: `SELECT * FROM json WHERE url="${config.dev.rest}${url}?${paramsString}"`,
                format: 'json',
                jsonCompat: 'new',
            },
        }, { responseType: 'jsonp' })
}

function recallingGetRequest(url, params, times) {
    let recalls = times === undefined || times === null ? config.dev.recalls : times;
    return new Promise((resolve, reject) => {
        if(recalls <= 0)
            reject("Сервер не отвечает");
        else{
            getRequest(url, params)
                .then(resolve)
                .catch(er => {
                    if(er.message === "Network Error" || (er.status && config.dev.recallingStatuses.indexOf(er.status) !== -1))
                        recallingGetRequest(url, params,--recalls)
                            .then(resolve)
                            .catch(reject);
                    else
                        reject(er);
                });
        }
    })
}

export {
    getRequest,
    recallingGetRequest
}
