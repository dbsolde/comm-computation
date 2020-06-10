import { getUserCurrentWeek, computeCommission } from '../src/utils/helper';

describe('Helpers method', () => {
    it('getUserCurrentWeek method should equal to 1', () => {
        expect(getUserCurrentWeek('2016-01-05')).toBe('1');
    });

    it('computeCommission method should return total amount of 0.06', () => {
        expect(computeCommission(200.00,0.03)).toBe(0.06);
    })
});