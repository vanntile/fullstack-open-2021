import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'REMOVE_USER':
      return null
    default:
      return state
  }
}

export const setUser = (data) => {
  blogService.setToken(data.token)
  return { type: 'SET_USER', data }
}

export const login = (credentials) => async (dispatch) => {
  try {
    const userData = await loginService.login(credentials)
    window.localStorage.setItem('user', JSON.stringify(userData))
    dispatch(setUser(userData))
  } catch (e) {
    console.error(e)
    dispatch(setNotification({ message: 'Wrong username or password', type: 'error' }))
  }
}

export const logout = () => {
  window.localStorage.removeItem('user')
  blogService.setToken(null)

  return { type: 'REMOVE_USER' }
}

export default reducer
