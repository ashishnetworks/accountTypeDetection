const chai = require('chai')
const expect = chai.expect
const accountTypeChecker = require('./accountTypeChecker')
const constants = require('./constants')
const fixedDelta = constants.fixedDelta
const variableDetla = constants.variableDetla

describe('accountTypeChecker->', () => {
  it('Returns default account type for account with shorter history', () => {
    const history = [
      {
        monthNumber: 0, // current month
        account: {
          balance: { amount: 0 }
        }
      }
    ]
    const result = accountTypeChecker(history)
    expect(result).to.equals(fixedDelta)
  })
  it('Returns paramtered account type for account with shorter history', () => {
    const history = [
      {
        monthNumber: 0, // current month
        account: {
          balance: { amount: 0 }
        }
      }
    ]
    const result = accountTypeChecker(history, variableDetla)
    expect(result).to.equals(variableDetla)
  })
  it('Returns fixed account type for account with history fixed decrease in account balance', () => {
    const history = [
      {
        monthNumber: 0, // current month
        account: {
          balance: { amount: 0 }
        }
      },
      {
        monthNumber: 1, // last month
        account: {
          balance: { amount: 100 }
        }
      },
      {
        monthNumber: 2, // two months ago
        account: {
          balance: { amount: 200 }
        }
      },
      {
        monthNumber: 3, // three months ago
        account: {
          balance: { amount: 300 }
        }
      },
      {
        monthNumber: 4, // fourth months ago
        account: {
          balance: { amount: 400 }
        }
      }
    ]
    const result = accountTypeChecker(history)
    expect(result).to.equals(fixedDelta)
  })
  it('Returns variable account type for account with history fixed decrease in account balance', () => {
    const history = [
      {
        monthNumber: 0, // current month
        account: {
          balance: { amount: 0 }
        }
      },
      {
        monthNumber: 1, // last month
        account: {
          balance: { amount: 100 }
        }
      },
      {
        monthNumber: 2, // two months ago
        account: {
          balance: { amount: 200 }
        }
      },
      {
        monthNumber: 3, // three months ago
        account: {
          balance: { amount: 350 }
        }
      },
      {
        monthNumber: 4, // fourth months ago
        account: {
          balance: { amount: 400 }
        }
      }
    ]
    const result = accountTypeChecker(history)
    expect(result).to.equals(variableDetla)
  })
})
