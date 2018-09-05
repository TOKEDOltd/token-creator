import TokenSaleAbi from '../assets/abi/Token-Sale.json'
import TokenSaleBytecode from '../assets/bytecode/Token-Sale.json'
import TokenSaleKycAbi from '../assets/abi/Token-Sale-Kyc.json'
import TokenSaleKycBytecode from '../assets/bytecode/Token-Sale-Kyc.json'
import bnUtils from '../../../bnUtils'
import BigNumber from 'bignumber.js'

export default async ({ web3, addTokenSale, mainTokenSaleAddress, tokenDecimals }) => {
  let abi, bytecode
  if (addTokenSale.kyc) {
    abi = TokenSaleKycAbi
    bytecode = TokenSaleKycBytecode
  } else {
    abi = TokenSaleAbi
    bytecode = TokenSaleBytecode
  }

  const contract = new web3.eth.Contract(abi)
  console.log('PREPARE', addTokenSale, mainTokenSaleAddress, tokenDecimals)
  const args = [
    mainTokenSaleAddress,
    new BigNumber(addTokenSale.price),
    bnUtils.times(addTokenSale.amount, bnUtils.pow(10, tokenDecimals)),
    new BigNumber(addTokenSale.minContribution),
    addTokenSale.startTime,
    addTokenSale.endTime
  ]
  const data = '0x' + bytecode.object
  const tx = contract.deploy({
    data,
    arguments: args
  })
  const gasPrice = await web3.eth.getGasPrice()
  let options = { from: web3.address, gasPrice }
  await tx.estimateGas(options)
  return tx
}
