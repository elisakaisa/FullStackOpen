import { useDispatch } from 'react-redux'

// internal imports
import { createAnecdote2 } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log()
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        console.log('newAnecdote', newAnecdote)
        dispatch(createAnecdote2(newAnecdote))

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