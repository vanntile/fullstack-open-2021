import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import WritePost from './WritePost'

const blog = {
  title: 'Wrong title',
  author: 'The Author',
  url: 'https://example.com',
}

test('Form submits proper data', async () => {
  const submit = jest.fn()

  const component = render(<WritePost submit={submit} notify={() => null} />)

  const title = component.container.querySelector('input[name="title"]')
  const author = component.container.querySelector('input[name="author"]')
  const url = component.container.querySelector('input[name="url"]')
  const createButton = component.getByText('Create')

  // Write to fields and submit
  fireEvent.change(title, { target: { value: blog.title } })
  fireEvent.change(author, { target: { value: blog.author } })
  fireEvent.change(url, { target: { value: blog.url } })
  fireEvent.click(createButton)

  const result = submit.mock.calls[0][0]
  expect(result).toEqual(blog)
})
