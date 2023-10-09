/* eslint-disable react/no-array-index-key */
import { FC } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styles from './TransactionLite.module.scss'
import DecimalCapacity from '../../../../components/DecimalCapacity'
import { parseCKBAmount, localeNumberString } from '../../../../utils/number'
import { shannonToCkb } from '../../../../utils/util'
import { Addr } from '../../TransactionCell'
import { defaultTransactionLiteDetails } from '../../state'
import { TransactionBadge } from './TransactionBadge'
import { fetchTransactionLiteDetailsByHash } from '../../../../services/ExplorerService/fetcher'

const getTransferItemTag = (transfer: State.LiteTransfer) => {
  const { cellType, udtInfo, mNftInfo } = transfer
  if (cellType === 'm_nft_token') {
    return `NFT-${mNftInfo?.className ?? 'Unknown'}`
  }
  if (cellType === 'udt') {
    return udtInfo?.displayName || `Uknown Asset #${udtInfo?.typeHash.substring(udtInfo.typeHash.length - 4)}`
  }
  return 'CKB'
}

export const TransactionCompLite: FC<{ isCellbase: boolean }> = ({ isCellbase }) => {
  const { hash: txHash } = useParams<{ hash: string }>()

  const query = useQuery(['ckb_transaction_details', txHash], async () => {
    const ckbTransactionDetails = await fetchTransactionLiteDetailsByHash(txHash)
    return ckbTransactionDetails.data
  })
  const transactionLiteDetails: State.TransactionLiteDetails[] = query.data ?? defaultTransactionLiteDetails
  return (
    <>
      {transactionLiteDetails &&
        transactionLiteDetails.map(item => (
          <div className="transaction_lite" key={item.address}>
            <div className={styles.transactionLiteBox}>
              <div className={styles.transactionLiteBoxHeader}>
                <div className={styles.transactionLiteBoxHeaderAddr}>
                  <Addr address={item.address} isCellBase={isCellbase} />
                </div>
              </div>
              <div className={styles.transactionLiteBoxContent}>
                {item.transfers.map((transfer, index) => {
                  return (
                    <div key={`transfer-${index}`}>
                      <div>{getTransferItemTag(transfer)}</div>
                      <div className={styles.addressDetailLite}>
                        <TransactionBadge cellType={transfer.cellType} capacity={parseCKBAmount(transfer.capacity)} />
                        <TransferAmount transfer={transfer} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

const TransferAmount: FC<{ transfer: State.LiteTransfer }> = ({ transfer }) => {
  const transferCapacity = new BigNumber(transfer.capacity)
  const transferAmount = new BigNumber(transfer.udtInfo?.amount ?? 0)
  const isIncome = transferCapacity.isPositive()
  const decimalPanelType = isIncome ? 'income' : 'payment'
  const isUdt = transfer.cellType === 'udt'
  const isNft = transfer.cellType === 'm_nft_token'

  const amountChange = localeNumberString(shannonToCkb(transferAmount))
  const capacityChange = localeNumberString(shannonToCkb(transferCapacity))
  const isIncomeColor = isIncome ? styles.add : styles.subtraction

  const getUdtComponent = () => {
    if (isUdt) {
      return (
        <>
          <DecimalCapacity balanceChangeType={decimalPanelType} value={amountChange} hideUnit hideZero />
          <div className={isIncomeColor}>{`(${Math.abs(Number(capacityChange))} CKB)`}</div>
        </>
      )
    }
    if (isNft) {
      return (
        <div className={isIncomeColor}>
          {isIncome ? '' : '-'}
          ID: {transfer.mNftInfo?.tokenId ?? 'Unknown'}
          {` (${Math.abs(Number(capacityChange))} CKB)`}
        </div>
      )
    }
    return <DecimalCapacity balanceChangeType={decimalPanelType} value={capacityChange} />
  }
  return (
    <div className={styles.capacityChange}>
      <span className={isIncomeColor}>{isIncome ? '+' : ''}</span>
      {getUdtComponent()}
    </div>
  )
}
