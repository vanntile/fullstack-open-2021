const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION': {
      if (state && state.id) clearTimeout(state.id)
      return { content: action.data.content }
    }
    case 'HIDE_NOTIFICATION':
      return null
    case 'TIMEOUT_NOTIFICATION':
      return { ...state, id: action.data.id }
    default:
      return state
  }
}

const notify = (content) => ({ type: 'SHOW_NOTIFICATION', data: { content } })

const hideNotification = () => ({ type: 'HIDE_NOTIFICATION' })

const setTimeoutId = (id) => ({ type: 'TIMEOUT_NOTIFICATION', data: { id } })

export const setNotification =
  (content, timeout = 5) =>
  async (dispatch) => {
    dispatch(notify(content))
    const id = setTimeout(() => {
      dispatch(hideNotification())
    }, timeout * 1000)
    dispatch(setTimeoutId(id))
  }

export default reducer
