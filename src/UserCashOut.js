import { getUserCurrentWeek, computeCommission } from './utils/helper';


class UserCashOut {

    constructor() {
        this.user = {}
    }

    /**
     * Calculate cashOut user commision
     * @param {object} data 
     * @param {object} config 
     */
    getUserCashOutCommission (data,config) {
        let commission = 0;
        const amount = data.operation.amount;
        const userId = data.user_id;
        // get transaction type and user type index
        const userConfig = config[`${data.type}_${data.user_type}`];
        const percents = userConfig.percents;

        if(data.user_type === "natural") {
            // Natural user commission computation
            const userWeekTransaction = getUserCurrentWeek(data.date);
            const weeklyLimitAmount = userConfig.week_limit.amount;            
            
            const userWeeklyCashOutTotal = this.getUserWeeklyTransaction(userId,amount,userWeekTransaction);
            // Let's check if we exceeded to the weekly amount limitation
            if(userWeeklyCashOutTotal + amount > weeklyLimitAmount) {

                let totalUserWithdrawn = userWeeklyCashOutTotal + amount - weeklyLimitAmount;
                if(totalUserWithdrawn > amount) {
                    totalUserWithdrawn = amount;
                }
                commission = computeCommission(totalUserWithdrawn,percents);
            }
        } else {
            // Legal user commission computation            
            const userMinAmount = userConfig.min.amount;
            commission = computeCommission(amount,percents);
            if(commission < userMinAmount) {
                commission = userMinAmount;
            }
        }

        return commission;
    }

    /**
     * This will sum up user weekly transaction
     * @param {Number} userId 
     * @param {Number} amount 
     * @param {Number} weeklyTransaction 
     */
    getUserWeeklyTransaction(userId,amount,weeklyTransaction) {
        if (!this.user[userId]) this.user[userId] = [];

        // This will add up user transaction
        const userWeeklyCashOutTotal = this.user[userId]
                .reduce((amount, data) =>
                    (
                        weeklyTransaction === data.weeklyTransaction 
                        ? amount + data.amount 
                        : amount
                    ),0);
        this.user[userId] = [...this.user[userId], { weeklyTransaction, amount }];
        return userWeeklyCashOutTotal;
    }
}

export default new UserCashOut();