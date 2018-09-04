import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import Loading from '../components/Loading'
import TokenSalePrice from '../components/steps/TokenSalePrice'
import TokenSaleAmount from '../components/steps/TokenSaleAmount'
import TokenSaleKyc from '../components/steps/TokenSaleKyc'
import TokenSaleMinContribution from '../components/steps/TokenSaleMinContribution'
import TokenSaleFundOwner from '../components/steps/TokenSaleFundOwner'
import WalletSelection from '../components/steps/WalletSelection'
import TermsAndConditions from '../components/TermsAndConditions'

import './AddTokenSaleAdvanced.css'

class AddTokenSaleAdvanced extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,

      validPrice: false,
      validAmount: false,
      validMinContribution: false,
      validFundOwner: false,
      valid: false,
      transaction: ''
    }
  }

  // Set validators
  setValidPrice = (valid) => {
    this.setState({ validPrice: valid, valid: this.isValid() })
  }
  setValidAmount = (valid) => {
    this.setState({ validAmount: valid, valid: this.isValid() })
  }
  setValidMinContribution = (valid) => {
    this.setState({ validMinContribution: valid, valid: this.isValid() })
  }
  setValidFundOwner = (valid) => {
    this.setState({ validFundOwner: valid, valid: this.isValid() })
  }

  // is Valid function
  isValid = () => {
    const { validPrice, validAmount, validMinContribution, validFundOwner } = this.state
    return validPrice && validAmount && validMinContribution && validFundOwner
  }

  render () {
    const { addTokenSale: { step }, preferences, loading, t } = this.props
    const { transaction, valid } = this.state
    if (!preferences.terms) {
      return <TermsAndConditions />
    }

    if (step === 6 && loading) {
      return <Loading />
    }
    return (
      <div id='token-sale-advanced' className='pure-u-22-24 pure-u-sm-20-24 pure-md-18-24'>
        {step === 6 ? <WalletSelection connectorName='addToken' transaction={transaction} onTransactionHash={this.onTransactionHash} onReceipt={this.onReceipt} />
          : <div className='big-card shadow pure-u-1 d-flex flex-column'>
            <div className='pure-u-1 d-flex flex-row flex-h-between flex-wrap'>
              <div className='pure-u-1 pure-u-md-12-24'>
                <TokenSalePrice setValid={this.setValidPrice} />
              </div>
              <div className='pure-u-1 pure-u-md-12-24'>
                <TokenSaleAmount setValid={this.setValidAmount} />
              </div>
            </div>
            <div className='pure-u-1 d-flex flex-row flex-h-between flex-wrap'>
              <div className='pure-u-1 pure-u-md-12-24'>
                <TokenSaleMinContribution setValid={this.setValidMinContribution} />
              </div>
              <div className='pure-u-1 pure-u-md-12-24'>
                <TokenSaleFundOwner setValid={this.setValidFundOwner} />
              </div>
            </div>
            <div className='pure-u-1 d-flex flex-row flex-h-between flex-v-end flex-wrap'>
              <div className='pure-u-1 pure-u-md-12-24'>
                <TokenSaleKyc />
              </div>
              <div className='deploy-container pure-u-1 pure-u-md-12-24'>
                {valid ? <button className='deploy pure-u-1 font-weight-bold' onClick={this.goToWalletSelection} >{t('Select the wallet')}</button> : null}
              </div>
            </div>
          </div>
        }
      </div>)
  }
}

export default translate('translations')(connect(s => s)(AddTokenSaleAdvanced))