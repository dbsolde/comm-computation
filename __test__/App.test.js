import App from '../src/App';

let app = new App();


const cashInData = { date: "2016-01-10", user_id: 2, user_type: "juridical", type: "cash_in", operation: { amount: 1000000.00, currency: "EUR" } };
const cashInConfig = { percents: 0.03, max: { amount: 5, currency: 'EUR' } };

const cashOutLegal = { date: "2016-01-06", user_id: 2, user_type: "juridical", type: "cash_out", operation: { amount: 300.00, currency: "EUR" } };
const cashOutLegalConfig = { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } };

const cashOutNatural = { date: "2016-01-10", user_id: 3, user_type: "natural", type: "cash_out", operation: { amount: 1000.00, currency: "EUR" } };
const cashOutNaturalConfig = { percents: 0.03, week_limit: { amount: 1000, currency: 'EUR' } };


describe('App', () => {
    it('Cash in', () => {
        expect(app.cashIn(cashInData,cashInConfig)).toBe('5.00');
    });

    it('Cash out Legal', () => {
        expect(app.cashOut(cashOutLegal,cashOutLegalConfig)).toBe('0.90');
    });

    it('Cash out Natural', () => {
        expect(app.cashOut(cashOutNatural,cashOutNaturalConfig)).toBe('0.00');
    });
})