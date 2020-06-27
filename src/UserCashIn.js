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
    const cashInMaxAmount = userConfig.max.amount;

    commission = computeCommission(amount,userConfig.percents);    
    if(commission > cashInMaxAmount) {
        commission = cashInMaxAmount;
    }
    
    return commission;
}

export default {
    getUserCashInCommission
}