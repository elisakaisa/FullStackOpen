import React from 'react'
import PropTypes from 'prop-types'

const Loginform = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => {


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

Loginform.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default Loginform