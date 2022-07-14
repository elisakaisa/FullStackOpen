import { useState, useEffect } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import RecommendedBooks from './components/RecommendedBooks'
import { ME, BOOK_ADDED } from './queries'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}



const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [me, setMe] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('subscription data', subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`New book added: "${addedBook.title}" by "${addedBook.author.name}"`)
    }
  })

  useEffect(() => {
    const tokenString = window.localStorage.getItem('library-user-token')
    if (tokenString) {
      setToken(tokenString)
    }
  }, [])

  const meQuery = useQuery(ME, {
    onCompleted: response => {
      setMe(response.me.favouriteGenre)
    }
  })
  
  if (meQuery.loading) {
    return <div>loading...</div>
  }


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {token && <button onClick={logout}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>
      <Notify errorMessage={errorMessage} />

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <RecommendedBooks show={page === 'recommendations'} me={me}/>

      <LoginForm show={page === 'login'} setError={notify}
        setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
