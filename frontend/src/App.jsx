import { useEffect, useState } from 'react'

export default function App() {
  const [state, setState] = useState({ loading: true, users: [], error: '' })

  useEffect(() => {
    fetch('/api/users')
      .then((response) => {
        if (!response.ok) throw new Error(`API request failed (${response.status})`)
        return response.json()
      })
      .then((users) => setState({ loading: false, users, error: '' }))
      .catch((error) => setState({ loading: false, users: [], error: error.message }))
  }, [])

  return (
    <main>
      <p className="eyebrow">React + FastAPI starter</p>
      <h1>tultenet</h1>
      <p>This page calls <code>/api/users</code> through the same origin.</p>
      {state.loading && <p>Loading users…</p>}
      {state.error && <p className="error">{state.error}</p>}
      <ul>{state.users.map((user) => <li key={user.id}>{user.name}</li>)}</ul>
    </main>
  )
}
