const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return { content: action.data.content }
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const notify = (content) => ({ type: 'SHOW_NOTIFICATION', data: { content } })

export const hideNotification = () => ({ type: 'HIDE_NOTIFICATION' })

const later = (delay, value) => new Promise((resolve) => setTimeout(resolve, delay, value))

export const setNotification =
  (content, timeout = 5) =>
  async (dispatch) => {
    dispatch(notify(content))
    setTimeout(() => {
      dispatch(hideNotification())
    }, timeout * 1000)
  }

export default reducer
