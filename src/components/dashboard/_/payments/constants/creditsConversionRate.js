/**
 * 1 credit = $0.10 CAD in this example
 * @type {number}
 */
const creditConversionRate = 0.1;
export const credits2Munee = (credits) => (credits * creditConversionRate * 100);
export default creditConversionRate;
