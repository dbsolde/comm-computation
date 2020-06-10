import axios from 'axios';

// axios interceptors
const createApi = (url) => {
    let api;
    
    api = axios.create({
        baseURL: url,
        responseType: 'json'
    });    
    
    api.interceptors.response.use(function (response) {
        return response;
    });

    return api;
};

const requests = {
	get: (url) =>
		createApi(url)
        .get(url)
        .then(handleResponse)
        .catch(handleErrors)
};

// Handles error on request
const handleErrors = (e) => console.log(e,'error');

// Handle response data
const handleResponse = result => result && result.data;

// Cash in endpoint
const CashIn = {
    cashin: () => requests.get(`http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in`)
};

// Cash out for legal/juridical and natural endpoints
const CashOut = {
    userLegal: () => requests.get(`http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical`),
    userNatural: () => requests.get(`http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural`)
};

export { CashIn, CashOut };