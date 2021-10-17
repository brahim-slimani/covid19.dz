import axios from 'axios';
//const PREFIX_API_NOVEL="https://corona.lmao.ninja/v3";
const PREFIX_API_NOVEL = "https://disease.sh/v3/covid-19";
const PREFIX_API_HDZ = "https://api.healthdz.com";

class CallService {


    getCountryCovid(country) {
        return axios.get(PREFIX_API_NOVEL + '/countries/' + country);
    }

    getWorldCovid() {
        return axios.get(PREFIX_API_NOVEL + '/all');
    }


    getHistoricalCovid(country) {
        return axios.get(PREFIX_API_NOVEL + '/historical/' + country);
    }

    getCountriesCovid() {
        return axios.get(PREFIX_API_NOVEL + '/countries');
    }

    getWilayasCovid() {
        return axios.get(PREFIX_API_HDZ + '/status');
    }

}

export default new CallService();
