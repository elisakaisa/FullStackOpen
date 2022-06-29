//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

// internal imports
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    //const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)

        // Notification
        props.setNotification(`added anecdote: ${content}`, 5)
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

const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)