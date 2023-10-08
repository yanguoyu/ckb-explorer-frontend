import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import TransactionHashCard from '../../components/Card/HashCard'
import Content from '../../components/Content'
import i18n from '../../utils/i18n'
import { TransactionDiv as TransactionPanel } from './TransactionComp/styled'
import { explorerService } from '../../services/ExplorerService'
import { QueryResult } from '../../components/QueryResult'
import { defaultTransactionInfo } from './state'
import { useSearchParams } from '../../utils/hook'
import { LayoutLiteProfessional } from '../../constants/common'
import { TransactionCompLite } from './TransactionComp/TransactionLite/TransactionLite'
import { TransactionComp } from './TransactionComp/TransactionComp'
import { TransactionOverview } from './TransactionComp/TransactionOverview'

export default () => {
  const { Professional, Lite } = LayoutLiteProfessional
  const { hash: txHash } = useParams<{ hash: string }>()

  const query = useQuery(['transaction', txHash], async () => {
    const wrapper = await explorerService.api.fetchTransactionByHash(txHash)
    const transaction = wrapper.attributes
    if (transaction.displayOutputs && transaction.displayOutputs.length > 0) {
      transaction.displayOutputs[0].isGenesisOutput = transaction.blockNumber === 0
    }
    return transaction
  })

  const transaction = query.data ?? defaultTransactionInfo
  const { blockTimestamp, txStatus } = transaction
  const searchParams = useSearchParams('layout')
  const layout = searchParams.layout === Lite ? Lite : Professional

  return (
    <Content>
      <TransactionPanel className="container">
        <TransactionHashCard title={i18n.t('transaction.transaction')} hash={txHash} loading={query.isLoading}>
          {txStatus !== 'committed' || blockTimestamp > 0 ? (
            <TransactionOverview transaction={transaction} layout={layout} />
          ) : null}
        </TransactionHashCard>
        {layout === Professional ? (
          <QueryResult query={query} delayLoading>
            {transaction => <TransactionComp transaction={transaction} />}
          </QueryResult>
        ) : (
          <QueryResult query={query} delayLoading>
            {transaction => <TransactionCompLite isCellbase={transaction.isCellbase} />}
          </QueryResult>
        )}
      </TransactionPanel>
    </Content>
  )
}
