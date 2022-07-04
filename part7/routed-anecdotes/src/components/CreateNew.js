import  { useField } from '../hooks'

const CreateNew = ({addNew}) => {

  const content = useField('text')
  const author = useField('text')
  const url = useField('text')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content: content.fields.value,
        author: author.fields.value,
        info: url.fields.value,
        votes: 0
      })
    }

    const handleReset = (e) => {
      e.preventDefault()
      content.onReset()
      author.onReset()
      url.onReset()
    }  

    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content.fields} />
          </div>
          <div>
            author
            <input {...author.fields} />
          </div>
          <div>
            url for more info
            <input {...url.fields} />
          </div>
          <button>create</button>
          <button onClick={handleReset}>Reset</button>
        </form>
      </div>
    )
  
}

export default CreateNew