import axios from 'axios';
const PREFIX_API_NOVEL="https://corona.lmao.ninja";
const PREFIX_API_HDZ="https://api.healthdz.com";

class CallService {

    getCountryCovid(country){
        return axios.get(PREFIX_API_NOVEL+'/countries/'+country);
    }

    getHistoricalCovid(country){
        return axios.get(PREFIX_API_NOVEL+'/v2/historical/'+country);
    }

    getCountriesCovid(){
        return axios.get(PREFIX_API_NOVEL+'/countries');
    }

    getWilayasCovid(){
        return axios.get(PREFIX_API_HDZ+'/status');
    }
}

export default new CallService();
