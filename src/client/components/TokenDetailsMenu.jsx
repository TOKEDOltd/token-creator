import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { isEmpty } from 'lodash'

import Loading from './Loading'
import padlockIcon from '../assets/images/padlock.svg'
import groupIcon from '../assets/images/groupIcon.svg'
import shieldIcon from '../assets/images/secure-shield.svg'
import addIcon from '../assets/images/addIcon.svg'
import trasferTokens from '../assets/images/transfer-token-gray.svg'
import { setState } from '../redux/addMainTokenSale'
import { setTokenMenu } from '../redux/preferences'

class TokenDetailsMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showMenu: true
    }
  }

  addTokenSale = () => {
    const { history, dispatch, tokenId, addMainTokenSale } = this.props
    if (!addMainTokenSale[tokenId] || addMainTokenSale[tokenId].state === 'uninitialized') {
      dispatch(setState({ state: 'initialized', tokenAddress: tokenId }))
    }
    if (addMainTokenSale[tokenId] && addMainTokenSale[tokenId].state === 'authorized') {
      history.push(`/token/details/${tokenId}/add-token-sale`)
    }
  }
  handleMenuStatus = () => {
    console.log('handleMenuStatus')
    const { dispatch, preferences } = this.props
    const showMenu = preferences.showMenu
    console.log('showMenu', showMenu)
    dispatch(setTokenMenu(!showMenu))
  }
  redirectTo = (href) => {
    const { history } = this.props
    history.push(href)
  }
  render () {
    const { t, tokenId, preferences, mainTokenSales } = this.props
    const showMenu = preferences.showMenu
    const mainTokenSalesById = mainTokenSales[tokenId]
    // const { showMenu } = this.state
    return (
      <div className={` ${showMenu ? ' pure-u-1 pure-u-sm-1 pure-u-md-1-3 pure-u-lg-5-24 pure-u-xl-5-24'
        : 'pure-u-lg-4-24 pure-u-md-5-24 pure-u-1 pure-u-4-24'}`}>
        <div className={`TokenDetailsMenu ${showMenu ? 'pure-u-1' : 'widthMenuClosed'}`}>
          <div className={` ${showMenu ? 'handleMenu' : 'closedHandleMenu'}`} onClick={this.handleMenuStatus}>
            {showMenu ? <p >{t('Close Menu')}</p>
              : <p >{t('Open')}<br />{t('Menu')}</p>}
            <i className={`fas fa-${showMenu ? 'close' : 'angle-right'}`} />
          </div>
          <div className={` ${showMenu ? '' : 'hideMenuResponsive'}`}>
            {(mainTokenSalesById && isEmpty(mainTokenSalesById.setAuthorizedReceipt))
              ? <button className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}><div style={{ width: '21px', marginRight: '9px' }}>
                <Loading size='21' color='#ffffff' /></div><p className='marginTxt'>{showMenu ? t('Waiting...') : null}</p>
              </button>
              : <button className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`} onClick={this.addTokenSale}>
                <img src={addIcon} />{showMenu ? <p className='marginTxt'>{t('Add Token Sale')}</p> : null}
              </button>
            }
            <button onClick={() => this.redirectTo(`/token/details/${tokenId}/unlock-the-token`)} className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}>
              <img src={padlockIcon} />{showMenu ? <p className='marginTxt'>{t('Unlock The Token')}</p> : null}
            </button>

            <button onClick={() => this.redirectTo(`/token/details/${tokenId}/change-token-owner`)} className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}>
              <img src={groupIcon} />{showMenu ? <p className='marginTxt'>{t('Change Token Owner')}</p> : null}
            </button>

            <button onClick={() => this.redirectTo(`/token/details/${tokenId}/authorize-transfer`)} className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}>
              <img src={shieldIcon} />{showMenu ? <p className='marginTxt'>{ t('Authorize Transfer')}</p> : null}
            </button>

            <button onClick={() => this.redirectTo(`/token/details/${tokenId}/transfer-tokens`)} className={` ${showMenu ? 'borderBtn' : 'flex-h-center'}`}>
              <img src={trasferTokens} />{showMenu ? <p className='marginTxt'>{t('Transfer Tokens')}</p> : null}
            </button>

          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(translate('translations')(connect(s => s)(TokenDetailsMenu)))
