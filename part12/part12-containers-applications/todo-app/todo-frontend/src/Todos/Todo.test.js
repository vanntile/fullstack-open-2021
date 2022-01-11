import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders todo and set as done button', () => {
  render(<Todo todo={{ text: 'hello there', done: false }} onClickDelete={() => {}} onClickComplete={() => {}} />)
  const textElement = screen.getByText(/hello there/i)
  expect(textElement).toBeInTheDocument()

  const buttonElement = screen.getByText(/Set as done/i)
  expect(buttonElement).toBeInTheDocument()
})
