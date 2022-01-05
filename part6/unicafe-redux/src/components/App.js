import React from 'react'
import store from '../utils/store'

const App = () => {
  const good = () => {
    store.dispatch({ type: 'GOOD' })
  }
  const ok = () => {
    store.dispatch({ type: 'OK' })
  }
  const bad = () => {
    store.dispatch({ type: 'BAD' })
  }
  const reset = () => {
    store.dispatch({ type: 'ZERO' })
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '1em' }}>
        <button onClick={good}>good</button>
        <button onClick={ok}>ok</button>
        <button onClick={bad}>bad</button>
        <button onClick={reset}>reset stats</button>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>good: {store.getState().good}</li>
        <li>ok: {store.getState().ok}</li>
        <li>bad: {store.getState().bad}</li>
      </ul>
    </div>
  )
}

export default App
