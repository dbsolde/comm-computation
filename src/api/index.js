import axios from 'axios';

// Cash in endpoint
const CashIn = {
    cashin: () => axios.get(`http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in`)
};

// Cash out for legal/juridical and natural endpoints
const CashOut = {
    userLegal: () => axios.get(`http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical`),
    userNatural: () => axios.get(`http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural`)
};

export { CashIn, CashOut };