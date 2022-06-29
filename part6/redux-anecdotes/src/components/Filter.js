import React from 'react'
//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

//internal imports
import { filter } from '../reducers/filterReducer'

const Filter = (props) => {
    //const dispatch = useDispatch()
    const handleChange = (event) => {
      // input-field value is in variable event.target.value
      props.filter(event.target.value)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
}

const mapDispatchToProps = {
  filter
}
  
export default connect(null, mapDispatchToProps)(Filter)