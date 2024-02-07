import { useTranslation } from 'react-i18next'
import { ReactEventHandler, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { AddressUDTItemPanel, LiveCellTable } from './styled'
import { CoTA, OmigaInscription, MNFT, NRC721, SUDT, Spore, LiveCell } from '../../models/Address'
import SUDTTokenIcon from '../../assets/sudt_token.png'
import { parseCKBAmount, parseUDTAmount } from '../../utils/number'
import { parseSporeCellData } from '../../utils/spore'
import { handleNftImgError, hexToBase64, patchMibaoImg } from '../../utils/util'
import { sliceNftName } from '../../utils/string'
import CKBTokenIcon from './ckb_token_icon.png'

export const AddressAssetComp = ({
  href,
  isUnverified,
  udtLabel,
  icon,
  name,
  property,
}: {
  property: string
  name?: string
  href?: string
  isUnverified?: boolean
  udtLabel: string
  icon?: {
    url: string
    errorHandler: ReactEventHandler<HTMLImageElement>
  }
}) => {
  const { t } = useTranslation()
  return (
    <AddressUDTItemPanel href={href} isLink={!!href}>
      <div className="addressUdtLabel">
        {isUnverified ? `${t('udt.unverified')}: ` : null}
        <span>{udtLabel}</span>
      </div>
      <div className="addressUdtDetail">
        {icon && <img className="addressUdtItemIcon" src={icon.url} alt="udt icon" onError={icon.errorHandler} />}
        <div className="addressUdtItemInfo">
          <span>{name}</span>
          <span>{property}</span>
        </div>
      </div>
    </AddressUDTItemPanel>
  )
}

export const AddressSudtComp = ({ account }: { account: SUDT }) => {
  const { symbol, decimal, amount, typeHash, udtIconFile, uan } = account
  const [icon, setIcon] = useState(udtIconFile || SUDTTokenIcon)

  useEffect(() => {})
  return (
    <AddressAssetComp
      href={`/sudt/${typeHash}`}
      property={parseUDTAmount(amount, decimal)}
      name={uan || symbol}
      udtLabel="sudt"
      icon={{ url: patchMibaoImg(icon), errorHandler: () => setIcon(SUDTTokenIcon) }}
    />
  )
}

export const AddressSporeComp = ({ account }: { account: Spore }) => {
  const { symbol, amount, udtIconFile, collection } = account
  const [icon, setIcon] = useState(udtIconFile)
  if (udtIconFile) {
    const sporeData = parseSporeCellData(udtIconFile)
    if (sporeData.content.slice(0, 5) === 'image') {
      const base64Data = hexToBase64(sporeData.content)
      setIcon(`data:${sporeData.contentType};base64,${base64Data}`)
    }
  }
  return (
    <AddressAssetComp
      href={`/nft-collections/${collection?.typeHash}`}
      property={`#${amount}`}
      name={sliceNftName(symbol)}
      udtLabel="Spore"
      icon={{ url: patchMibaoImg(icon), errorHandler: handleNftImgError }}
    />
  )
}

export const AddressMNFTComp = ({ account }: { account: MNFT }) => {
  const { symbol, amount, udtIconFile, collection } = account
  const [icon, setIcon] = useState(udtIconFile)

  useEffect(() => {
    axios
      .get(/https?:\/\//.test(udtIconFile) ? udtIconFile : `https://${udtIconFile}`)
      .then((res: AxiosResponse) => {
        if (typeof res.data?.image === 'string') {
          setIcon(res.data.image)
        } else {
          throw new Error('Image not found in metadata')
        }
      })
      .catch((err: Error) => {
        console.error(err.message)
      })
  }, [udtIconFile])

  return (
    <AddressAssetComp
      href={`/nft-collections/${collection?.typeHash}`}
      property={`#${amount}`}
      name={sliceNftName(symbol)}
      udtLabel="m nft"
      icon={{
        url: `${patchMibaoImg(icon)}?${new URLSearchParams({
          size: 'small',
          tid: amount,
        })}`,
        errorHandler: handleNftImgError,
      }}
    />
  )
}

export const AddressNRC721Comp = ({ account }: { account: NRC721 }) => {
  const { symbol, amount, udtIconFile, collection } = account
  const [icon, setIcon] = useState(udtIconFile)

  useEffect(() => {
    axios
      .get(/https?:\/\//.test(udtIconFile) ? udtIconFile : `https://${udtIconFile}`)
      .then((res: AxiosResponse) => {
        if (typeof res.data?.image === 'string') {
          setIcon(res.data.image)
        } else {
          throw new Error('Image not found in metadata')
        }
      })
      .catch((err: Error) => {
        console.error(err.message)
      })
  }, [udtIconFile])

  return (
    <AddressAssetComp
      href={`/nft-collections/${collection?.typeHash}`}
      property={!symbol ? '?' : `#${amount}`}
      name={!symbol ? '?' : sliceNftName(symbol)}
      isUnverified={!symbol}
      udtLabel="nrc 721"
      icon={{
        url: `${patchMibaoImg(icon)}?${new URLSearchParams({
          size: 'small',
          tid: amount,
        })}`,
        errorHandler: handleNftImgError,
      }}
    />
  )
}

export const AddressCoTAComp = ({ account }: { account: CoTA }) => {
  const { symbol, udtIconFile, cota } = account
  const [icon, setIcon] = useState(udtIconFile)

  useEffect(() => {
    axios
      .get(/https?:\/\//.test(udtIconFile) ? udtIconFile : `https://${udtIconFile}`)
      .then((res: AxiosResponse) => {
        if (typeof res.data?.image === 'string') {
          setIcon(res.data.image)
        } else {
          throw new Error('Image not found in metadata')
        }
      })
      .catch((err: Error) => {
        console.error(err.message)
      })
  }, [udtIconFile])

  return (
    <AddressAssetComp
      href={`/nft-collections/${cota?.cotaId}`}
      property={`#${cota?.tokenId}`}
      name={sliceNftName(symbol)}
      udtLabel="CoTA"
      icon={{
        url: `${patchMibaoImg(icon)}?${new URLSearchParams({
          size: 'small',
          tid: cota?.cotaId?.toString(),
        })}`,
        errorHandler: handleNftImgError,
      }}
    />
  )
}

export const AddressOmigaInscriptionComp = ({ account }: { account: OmigaInscription }) => {
  const { decimal, expectedSupply, mintStatus, amount, symbol, typeHash, udtAmount } = account
  const { t } = useTranslation()
  return (
    <AddressAssetComp
      href={`/inscription/${typeHash}`}
      name={parseUDTAmount(amount, decimal)}
      property={`${t(`udt.mint_status_${mintStatus}`)}(${parseUDTAmount(udtAmount, decimal)}/${parseUDTAmount(
        expectedSupply,
        decimal,
      )})`}
      udtLabel={symbol!}
    />
  )
}

export const AddressLiveCellComp = ({ account }: { account: LiveCell }) => {
  const { amount, capacity, time, uan, outpoint } = account
  return (
    <AddressAssetComp
      icon={{
        url: CKBTokenIcon,
        errorHandler: handleNftImgError,
      }}
      name={uan ?? 'CKB Cell'}
      property={uan ? amount : capacity}
      udtLabel={`${outpoint.txHash.slice(0, 3)}...${outpoint.txHash.slice(63, 65)}:${outpoint.index} (${new Date(
        parseInt(time, 10),
      )
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')})`}
    />
  )
}

export const AddressLiveCellTableComp = ({ liveCells }: { liveCells: LiveCell[] }) => {
  const liveCellColumns = [
    { align: 'center' as const, title: 'Date', dataIndex: 'date', key: 'date' },
    { align: 'center' as const, title: 'Block #', dataIndex: 'block', key: 'block' },
    { align: 'center' as const, title: 'OutPoint', dataIndex: 'outpoint', key: 'outpoint' },
    { align: 'center' as const, title: 'UID', dataIndex: 'uid', key: 'uid' },
    { align: 'center' as const, title: 'Capacity(CKB)', dataIndex: 'capacity', key: 'capacity' },
    { align: 'center' as const, title: 'Type(i)', dataIndex: 'type', key: 'type' },
  ]
  return (
    <LiveCellTable
      scroll={{ x: 2100 }}
      pagination={false}
      bordered
      columns={liveCellColumns}
      dataSource={liveCells.map(liveCell => {
        const cellType = () => {
          switch (liveCell.cellType) {
            case 'sudt':
              return 'UDT'
            case 'spore_cell':
            case 'm_nft_token':
            case 'cota':
            case 'nrc_721_token':
              return 'NFT'
            case 'omiga_inscription':
            case 'omiga_inscription_info':
              return 'INSCRIPTION'
            case 'normal':
              return 'CKB'
            default:
              return 'UNKNOWN'
          }
        }
        return {
          date: new Date(parseInt(liveCell.time, 10)).toISOString().slice(0, 19).replace('T', ' ').replace('Z', ' '),
          block: liveCell.block,
          outpoint: `${liveCell.outpoint.txHash}:${liveCell.outpoint.index}`,
          uid: liveCell.outpoint.txHash,
          capacity: parseCKBAmount(liveCell.capacity),
          type: cellType(),
        }
      })}
    />
  )
}
