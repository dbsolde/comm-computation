import moment from 'moment'

/**
 * Weekly date helper
 * @param {date} date 
 */
export const getUserCurrentWeek = date => moment(date, "YYYY-MM-DD").format("W");

/**
 * A helper for amount computation
 * @param {Number} amount 
 * @param {Number} percents 
 */
export const computeCommission = (amount,percents) => (amount * percents)  / 100;

