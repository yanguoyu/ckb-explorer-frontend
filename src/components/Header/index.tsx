import React, { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Search from '../Search'
import LogoIcon from '../../assets/ckb_logo.png'
import MobileLogoIcon from '../../assets/mobile_ckb_logo.png'
import SearchLogo from '../../assets/search.png'
import i18n from '../../utils/i18n'
import {
  HeaderDiv,
  HeaderMobileDiv,
  HeaderMobilePanel,
  HeaderSearchPanel,
  HeaderVersionPanel,
  HeaderTestnetPanel,
  HeaderSearchMobilePanel,
} from './styled'
import { isMobile } from '../../utils/screen'
import { AppContext } from '../../contexts/providers/index'
import { AppDispatch, ComponentActions } from '../../contexts/providers/reducer'
import Dropdown from './Dropdown'

enum LinkType {
  Inner,
  Outer,
}

const Menus = () => {
  const [t] = useTranslation()
  const MenuDatas = useMemo(() => {
    return [
      {
        type: LinkType.Inner,
        name: t('navbar.charts'),
        url: '/charts',
      },
      {
        type: LinkType.Outer,
        // name: t('navbar.faucet'),
        // url: 'https://faucet.nervos.org',
        name: '',
        url: '',
      },
    ]
  }, [t])

  return (
    <div className="header__menus">
      {MenuDatas.map(menu => {
        return menu.type === LinkType.Inner ? (
          <Link className="header__menus__item" to={menu.url} key={menu.name}>
            {menu.name}
          </Link>
        ) : (
          <a className="header__menus__item" href={menu.url} target="_blank" rel="noopener noreferrer" key={menu.name}>
            {menu.name}
          </a>
        )
      })}
    </div>
  )
}

const handleVersion = (nodeVersion: string) => {
  if (nodeVersion && nodeVersion.indexOf('(') !== -1) {
    return `v${nodeVersion.slice(0, nodeVersion.indexOf('('))}`
  }
  return nodeVersion
}

export default ({ hasSearch, dispatch }: { hasSearch?: boolean; dispatch: AppDispatch }) => {
  const { app, components } = useContext(AppContext)
  const { nodeVersion } = app
  const { searchBarEditable } = components

  return (
    <React.Fragment>
      {isMobile() ? (
        <>
          {hasSearch && (
            <HeaderSearchMobilePanel searchBarEditable={searchBarEditable}>
              <Search dispatch={dispatch} />
            </HeaderSearchMobilePanel>
          )}
          <HeaderMobilePanel searchBarEditable={searchBarEditable}>
            <HeaderMobileDiv>
              <Link to="/" className="header__logo">
                <img className="header__logo__img" src={MobileLogoIcon} alt="logo" />
              </Link>
              <Menus />
              {hasSearch && (
                <div className="header__search">
                  <div
                    className="header__search__component"
                    onKeyDown={() => {}}
                    onClick={() => {
                      dispatch({
                        type: ComponentActions.UpdateHeaderSearchEditable,
                        payload: {
                          searchBarEditable: true,
                        },
                      })
                    }}
                    role="button"
                    tabIndex={-1}
                  >
                    <img className="header__search__image" src={SearchLogo} alt="search" />
                  </div>
                  <div className="header__search__separate" />
                </div>
              )}
              <HeaderTestnetPanel search={!!hasSearch}>
                <div className="header__testnet__flag">{i18n.t('navbar.network')}</div>
                <HeaderVersionPanel>
                  <div>{handleVersion(nodeVersion)}</div>
                </HeaderVersionPanel>
                <Dropdown dispatch={dispatch} />
              </HeaderTestnetPanel>
            </HeaderMobileDiv>
            <HeaderSearchPanel>{hasSearch && searchBarEditable && <Search dispatch={dispatch} />}</HeaderSearchPanel>
          </HeaderMobilePanel>
        </>
      ) : (
        <>
          <HeaderDiv>
            <Link to="/" className="header__logo">
              <img className="header__logo__img" src={LogoIcon} alt="logo" />
            </Link>
            <Menus />
            {hasSearch && (
              <div className="header__search">
                <div className="header__search__component">
                  <Search dispatch={dispatch} />
                </div>
              </div>
            )}
            <HeaderTestnetPanel search={!!hasSearch}>
              <div className="header__testnet__flag">{i18n.t('navbar.network')}</div>
              <HeaderVersionPanel>
                <div>{handleVersion(nodeVersion)}</div>
              </HeaderVersionPanel>
              <Dropdown dispatch={dispatch} />
            </HeaderTestnetPanel>
          </HeaderDiv>
        </>
      )}
    </React.Fragment>
  )
}
