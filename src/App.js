import { CashIn, CashOut } from './api';
import data from './data/input.json';
import { getUserCurrentWeek, computeCommission } from './utils/helper';

export default class App {

    constructor() {
        this.inputData = data;
        this.cashInData = {};
        this.cashOutLegalData = {};
        this.cashOutNaturalData = {};
        this.user = {};
    }


    async calculateCommission() {
        let results = [];

        this.cashInData = await CashIn.cashin();
        this.cashOutLegalData = await CashOut.userLegal();
        this.cashOutNaturalData = await CashOut.userNatural();

        this.inputData.map( item => {
            let commission;

            if(item.type === "cash_in") {
                commission = this.cashIn(item,this.cashInData);
            } else {
                const config = item.user_type === "natural" ? this.cashOutNaturalData : this.cashOutLegalData;
                commission = this.cashOut(item,config);
            }

            results.push(commission)
        });

        console.log('node app.js input.json')

        console.log(results);
    }

    /**
     * Calculate cashIn user commision
     * @param {object} data 
     * @param {object} config 
     */
    cashIn (data,config) {        
        let commission = 0;
        const amount = data.operation.amount;
        
        commission = computeCommission(amount,config.percents);

        if(commission > config.max.amount) {
            commission = config.max.amount;
        }
        
        return commission.toFixed(2);
    }

    /**
     * Calculate cashOut user commision
     * @param {object} data 
     * @param {object} config 
     */
    cashOut (data,config) {
        
        let commission = 0;
        const amount = data.operation.amount;
        const userId = data.user_id;

        if(data.user_type === "natural") {
            // Natural user commission computation
            const userWeekTransaction = getUserCurrentWeek(data.date);
            const weeklyLimitAmount = config.week_limit.amount;            
            
            const userWeeklyCashOutTotal = this.getUserWeeklyTransaction(userId,amount,userWeekTransaction)

            // Let's check if we exceeded to the weekly amount limitation
            if(userWeeklyCashOutTotal + amount > weeklyLimitAmount) {

                let totalUserWithdrawn = userWeeklyCashOutTotal + amount - weeklyLimitAmount;
                if(totalUserWithdrawn > amount) {
                    totalUserWithdrawn = amount;
                }
                commission = computeCommission(totalUserWithdrawn,config.percents);
            }
            
        } else {
            // Legal user commission computation            
            commission = computeCommission(amount,config.percents);
            if(commission < config.min.amount) {
                commission = config.min.amount;
            }
        }

        return commission.toFixed(2);
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
                    )
                ,0);
        this.user[userId] = [...this.user[userId], { weeklyTransaction, amount }];
        return userWeeklyCashOutTotal;
    }
}
