import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import posts from './blogsReducer'
import notification from './notificationReducer'
import user from './userReducer'

const reducer = combineReducers({
  notification,
  posts,
  user,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
