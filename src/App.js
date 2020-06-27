import { CashIn, CashOut } from './api';
import UserCashIn from './UserCashIn';
import UserCashOut from './UserCashOut';
import data from './data/input.json';
import { roundUp } from './utils/helper';

class App {

    constructor() {
        this.inputData = data;
        this.config = {};
    }

    /**
     * Load all required api's
     */
    async loadAppData() {
        await Promise.all([CashIn.cashin(), CashOut.userNatural(), CashOut.userLegal()])
        .then( results => {

            this.inputData.map( item => {                
                if(item.type === 'cash_in') {
                    // Let's save transaction type and user type as config index
                    this.config[`${item.type}_${item.user_type}`] = results[0].data;
                } else {
                    if(item.user_type === 'natural') {
                        this.config[`${item.type}_${item.user_type}`] = results[1].data;
                    } else if(item.user_type === 'juridical') {
                        this.config[`${item.type}_${item.user_type}`] = results[2].data;
                    }
                }
                this.getUserCommission(item);
            });
        })
        .catch(e => {
            console.log(e,'error');
        }); 
    }

    /**
     * Assign a user for commission computation
     * @param {object} item 
     */
    getUserCommission(item) {
        let commission;
        if(item.type === "cash_in") {
            commission = UserCashIn.getUserCashInCommission(item,this.config);
        } else {
            commission = UserCashOut.getUserCashOutCommission(item,this.config);
        }
        this.printResult(roundUp(commission));
        
    }

    /**
     * Printing stuff
     * @param {Number} commission 
     */
    printResult(commission) {
        console.log(commission);
    }

}

export default new App();