import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import TokenSalePrice from '../components/steps/TokenSalePrice'
import TokenSaleAmount from '../components/steps/TokenSaleAmount'
import TokenSaleKyc from '../components/steps/TokenSaleKyc'
import TokenSaleMinContribution from '../components/steps/TokenSaleMinContribution'
import TokenSaleFundOwner from '../components/steps/TokenSaleFundOwner'
import WalletSelection from '../components/steps/WalletSelection'
import TermsAndConditions from '../components/TermsAndConditions'
import { setStep } from '../redux/addTokenSale'

class AddTokenSaleWizard extends Component {
  goToStep2 = () => {
    const { dispatch } = this.props
    dispatch(setStep(2))
  }

  goToStep3 = () => {
    const { dispatch } = this.props
    dispatch(setStep(3))
  }

  goToStep4 = () => {
    const { dispatch } = this.props
    dispatch(setStep(4))
  }

  goToStep5 = () => {
    const { dispatch } = this.props
    dispatch(setStep(5))
  }

  deployToken = () => {
    const { dispatch } = this.props
    dispatch(setStep(6))
  }

  renderStep (step) {
    switch (step) {
      case 1:
        return <TokenSalePrice nextFunction={this.goToStep2} />
      case 2:
        return <TokenSaleAmount nextFunction={this.goToStep3} />
      case 3:
        return <TokenSaleMinContribution nextFunction={this.goToStep4} />
      case 4:
        return <TokenSaleFundOwner nextFunction={this.goToStep5} />
      case 5:
        return <TokenSaleKyc nextFunction={this.deployToken} />
      case 6:
        return <WalletSelection />
    }
  }

  render () {
    const { addTokenSale, preferences } = this.props
    if (!preferences.terms) {
      return <TermsAndConditions />
    }
    return (
      <div>
        <div>Step: {addTokenSale.step}</div>
        {this.renderStep(addTokenSale.step)}
      </div>
    )
  }
}

export default translate('translations')(connect(s => s)(AddTokenSaleWizard))
