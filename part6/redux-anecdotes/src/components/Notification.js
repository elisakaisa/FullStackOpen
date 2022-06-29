//import { useSelector } from 'react-redux'
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  //const notification = useSelector(state => state.notifications)
  const notification = props.notification

  // rendering
  return (
    <div>
      {notification &&
        <div style={style}>
          {notification}
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications 
  }
}

export default connect(mapStateToProps)(Notification)