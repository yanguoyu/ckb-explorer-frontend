export const initAddressState: State.AddressState = {
  address: {
    addressHash: '',
    lockHash: '',
    balance: '0',
    daoDeposit: 0,
    interest: 0,
    transactionsCount: 0,
    pendingRewardBlocksCount: 0,
    lockScript: {
      args: '',
      codeHash: '',
      hashType: '',
    },
    type: '',
    lockInfo: {
      status: 'unlocked',
      epochNumber: '0',
      epochIndex: '0',
    },
  },
  transactions: [],
  total: 0,
  addressStatus: 'None',
  transactionsStatus: 'None',
}

export default initAddressState