import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote2 } from '../reducers/anecdoteReducer'
import { hideNotification, showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    // get anmecdotes from state and filter them
    let anecdotes = useSelector(
        state => state.anecdotes.filter(
            anecdote => anecdote.content.toLocaleLowerCase().includes(state.filter.toLocaleLowerCase())
        )
    )

    // make a copy of anecdotes to avoid state mutation errors
    let sortedAnecdotes = [...anecdotes].sort((a, b) => (b.votes - a.votes))

    const vote = (anecdote) => {
        dispatch(voteAnecdote2(anecdote.id))
        
        // Notification
        dispatch(showNotification(`voted on anecdote: ${anecdote.content}`))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
    }

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
             )}
        </div>
    )
}

export default AnecdoteList