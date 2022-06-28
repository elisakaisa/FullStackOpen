import { useDispatch } from 'react-redux'

// internal imports
import { createAnecdote2 } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote2(content))

        // Notification
        dispatch(showNotification(`added anecdote: ${content}`))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
    }


    return (
        <div>
            <form onSubmit={addAnecdote}>
                <input name='anecdote' />
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default AnecdoteForm