import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdotes from './anecdoteReducer'
import filter from './filterReducer'
import notification from './notificationReducer'

const reducer = combineReducers({
  anecdotes,
  filter,
  notification,
})

const store = createStore(reducer, composeWithDevTools())

export default store
