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

export default reducer
