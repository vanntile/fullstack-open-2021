const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return [...state.map((e) => (e.id === action.data.id ? { ...e, votes: e.votes + 1 } : e))]
    case 'CREATE':
      return [...state, action.data]
    case 'INIT':
      return action.data.anecdotes
    default:
      return state
  }
}

export const vote = (id) => ({ type: 'VOTE', data: { id } })

export const create = (data) => ({ type: 'CREATE', data })

export const initializeAnecdotes = (anecdotes) => ({ type: 'INIT', data: { anecdotes } })

export default reducer
