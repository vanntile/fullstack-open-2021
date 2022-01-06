import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOG':
      return action.data.blogs
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'UPDATE_BLOG':
      return [...state.map((e) => (e.id === action.data.id ? action.data : e))]
    case 'REMOVE_BLOG':
      return state.filter((e) => e.id !== action.data.id)
    default:
      return state
  }
}

export const initializeBlog = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch({ type: 'INIT_BLOG', data: { blogs } })
}

export const createBlog = (data) => async (dispatch) => {
  const entry = await blogService.create(data)
  dispatch({ type: 'CREATE_BLOG', data: entry })
}

export const updateBlog = (data) => async (dispatch) => {
  const entry = await blogService.update(data)
  dispatch({ type: 'UPDATE_BLOG', data: entry })
}

export const removeBlog = (id) => async (dispatch) => {
  await blogService.remove({ id })
  dispatch({ type: 'REMOVE_BLOG', data: { id } })
}

export default reducer
