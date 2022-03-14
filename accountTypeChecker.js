/**
 * Auther: Ashish Dandgawhale,
 * Type 🅰 denotes a balance history where the balance amount changes by varying amounts each month.
 * Type 🅱 is one where the balance amount decreases by the same amount each month.
 */

const constants = require('./constants')
const fixedDelta = constants.fixedDelta
const variableDetla = constants.variableDetla

const accountTypeChecker = (accountBalanceHistory, defaultType = fixedDelta) => {
  const historyLength = accountBalanceHistory.length
  if (historyLength <= 2) {
    // When there are two or less than two balance history available
    return defaultType
  }
  let firstDetlta = null
  for (let i = 0; i <= historyLength - 2; i++) {
    const currentMonthBalance = accountBalanceHistory[i].account.balance.amount
    const previousMonthBalance = accountBalanceHistory[i + 1].account.balance.amount
    const currentDetla = currentMonthBalance - previousMonthBalance
    if (currentDetla > 0) {
      // Returning typeA because as per the problem statement balance should DECREASE in order to be a type B
      return variableDetla
    }
    if (firstDetlta == null) {
      // It sets different for first two balances
      firstDetlta = currentDetla
    }
    if (firstDetlta !== currentDetla) {
      // If difference is not common for subsequent balances
      return variableDetla
    }
  }
  return fixedDelta
}

module.exports = accountTypeChecker
