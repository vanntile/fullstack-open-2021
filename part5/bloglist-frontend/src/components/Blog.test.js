import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, waitFor } from '@testing-library/react'
import axios from 'axios'
import React from 'react'
import Blog from './Blog'

jest.mock('axios')

const user = {
  username: 'test',
  name: 'Test',
  id: 42,
}

const blog = {
  id: 1,
  title: 'Interesting title',
  author: 'test',
  url: 'url',
  likes: 5,
  user,
}

const refetch = () => null
const update = () => null
const notify = () => null

const params = {
  user,
  blog,
  refetch,
  update,
  notify,
}

test('Renders title and author but not URL or likes by default', () => {
  const component = render(<Blog {...params} />)

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)

  expect(component.container).not.toHaveTextContent(`Likes: ${blog.likes}`)
  expect(component.container).not.toHaveTextContent(`URL: ${blog.url}`)
})

test('Reveals hidden data on trigger', () => {
  const component = render(<Blog {...params} />)

  const button = component.getByText('show details')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(`Likes: ${blog.likes}`)
  expect(component.container).toHaveTextContent(`URL: ${blog.url}`)
})

test('Like triggers two updates when clicked twice', async () => {
  const update = jest.fn()

  axios.put.mockResolvedValue({ data: blog })

  const componentParams = { ...params, update }

  const component = render(<Blog {...componentParams} />)

  const button = component.getByText('show details')
  fireEvent.click(button)

  const likeButton = component.getByText('like')

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  await waitFor(() => expect(update).toHaveBeenCalledTimes(2))
})
