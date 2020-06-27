
import UserCashIn from '../src/UserCashIn';
import UserCashOut from '../src/UserCashOut';

describe('App', () => {

    it('Cash in', () => {
        const cashInData = { date: "2016-01-10", user_id: 2, user_type: "juridical", type: "cash_in", operation: { amount: 1000000.00, currency: "EUR" } };
        const cashInConfig = { 
            cash_in_juridical: { percents: 0.03, max: { amount: 5, currency: 'EUR' } }
        };
        expect(UserCashIn.getUserCashInCommission(cashInData,cashInConfig)).toBe(5);
    });

    it('Cash out Legal', () => {        
        const cashOutLegal = { date: "2016-01-06", user_id: 2, user_type: "juridical", type: "cash_out", operation: { amount: 300.00, currency: "EUR" } };
        const cashOutLegalConfig = {
            cash_out_juridical: { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } }
        };
        expect(UserCashOut.getUserCashOutCommission(cashOutLegal,cashOutLegalConfig)).toBe(0.90);
    });


    const cashOutNatural = { date: "2016-01-10", user_id: 3, user_type: "natural", type: "cash_out", operation: { amount: 1000.00, currency: "EUR" } };
    const cashOutNaturalConfig = {
        cash_out_natural: { percents: 0.03, week_limit: { amount: 1000, currency: 'EUR' } }
    };
    it('Cash out Natural', () => {
        expect(UserCashOut.getUserCashOutCommission(cashOutNatural,cashOutNaturalConfig)).toBe(0);
    });

    it('Get user weekly cashout summary', () => {       
        expect(UserCashOut.getUserWeeklyTransaction(1,1000.00,1)).toBe(0);
    });

    it('User weekly cashout exceeds to weekly limitation', () => {
        expect(UserCashOut.getUserWeeklyTransaction(1,1000.00,1)).toBe(1000);
    });

    it('User cashout 1000 on the second week', () => {
        expect(UserCashOut.getUserWeeklyTransaction(1,1000.00,2)).toBe(0);
    });
})