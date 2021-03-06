import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import persistState from 'redux-localstorage'

import { web3 } from './web3'
import { addToken } from './addToken'
import { addTokenSale } from './addTokenSale'
import { tokens } from './tokens'
import { tokenSales } from './tokenSales'
import { addMainTokenSale } from './addMainTokenSale'
import { mainTokenSales } from './mainTokenSales'
import { preferences } from './preferences'
import { actions } from './actions'

const reducers = combineReducers({
  web3,
  addToken,
  addTokenSale,
  addMainTokenSale,
  tokens,
  tokenSales,
  mainTokenSales,
  preferences,
  actions
})

const reducersToPersist = [
  'addToken',
  'addTokenSale',
  'addMainTokenSale',
  'tokens',
  'tokenSales',
  'mainTokenSales',
  'preferences',
  'actions'
]

const composeEnhancers = composeWithDevTools({realtime: true, port: 8080})

let enhancers = composeEnhancers(
  applyMiddleware(thunkMiddleware,
    promiseMiddleware()
  )
)

if (process.env.NODE_ENV === 'production') {
  enhancers = applyMiddleware(thunkMiddleware, promiseMiddleware())
}

export const store = createStore(
  reducers,
  enhancers,
  persistState(reducersToPersist)
)
