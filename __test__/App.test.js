
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

        expect(UserCashOut.getUserCashOutCommission(cashOutLegal,cashOutLegalConfig)).toBe(0.9);
    });

    it('Cash out Natural', () => {

        const cashOutNatural = { date: "2016-01-10", user_id: 3, user_type: "natural", type: "cash_out", operation: { amount: 1000.00, currency: "EUR" } };
        const cashOutNaturalConfig = {
            cash_out_natural: { percents: 0.03, week_limit: { amount: 1000, currency: 'EUR' } }
        };

        expect(UserCashOut.getUserCashOutCommission(cashOutNatural,cashOutNaturalConfig)).toBe(0);
    });
})