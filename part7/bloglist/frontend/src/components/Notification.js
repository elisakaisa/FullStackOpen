import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notification = useSelector(state => state.notifications)

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

export default Notification