const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION': {
      if (state && state.id) clearTimeout(state.id)
      return { ...action.data }
    }
    case 'HIDE_NOTIFICATION':
      return null
    case 'TIMEOUT_NOTIFICATION':
      return { ...state, id: action.data.id }
    default:
      return state
  }
}

const notify = (data) => ({ type: 'SHOW_NOTIFICATION', data })

const hideNotification = () => ({ type: 'HIDE_NOTIFICATION' })

const setTimeoutId = (id) => ({ type: 'TIMEOUT_NOTIFICATION', data: { id } })

export const setNotification =
  (data, timeout = 5) =>
  async (dispatch) => {
    dispatch(notify(data))
    const id = setTimeout(() => {
      dispatch(hideNotification())
    }, timeout * 1000)
    dispatch(setTimeoutId(id))
  }

export default reducer
