import { computeCommission } from './utils/helper';

/**
 * Calculate cashIn user commision
 * @param {object} data 
 * @param {object} config 
 */
const getUserCashInCommission = (data,config) => {
    let commission = 0;
    const amount = data.operation.amount;
    // get transaction type and user type index
    const userConfig = config[`${data.type}_${data.user_type}`];

    commission = computeCommission(amount,userConfig.percents);

    if(commission > userConfig.max.amount) {
        commission = userConfig.max.amount;
    }
    
    return commission;
}

export default {
    getUserCashInCommission
}