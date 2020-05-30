import axios from 'axios';
const PREFIX_API_NOVEL="https://disease.sh/v2";
const PREFIX_API_HDZ="https://api.healthdz.com";
const PREFIX_API_DAILY = "https://api.covid19api.com/live/country"

class CallService {


    getCountryCovid(country){
        return axios.get(PREFIX_API_NOVEL+'/countries/'+country);
    }

    getWorldCovid(){
        return axios.get(PREFIX_API_NOVEL+'/all');
    }


    getHistoricalCovid(country){
        return axios.get(PREFIX_API_NOVEL+'/historical/'+country);
    }

    getCountriesCovid(){
        return axios.get(PREFIX_API_NOVEL+'/countries');
    }

    getWilayasCovid(){
        return axios.get(PREFIX_API_HDZ+'/status');
    }

    getDailyReport(status){
        return axios.get(PREFIX_API_DAILY+'/algeria/status/'+status);
    }

    getTotalAlgeria(){
        return axios.get(PREFIX_API_DAILY+'/algeria');
    }
}

export default new CallService();
