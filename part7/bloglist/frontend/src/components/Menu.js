import { Link } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { logoutAction } from '../reducers/loginReducer'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'

const Button = styled.button`
    background: lightcyan;
    font-size: 1em;
    margin: 0.5em;
    padding: 0.25em 1em;
    border: 2px solid midnightblue;
    border-radius: 3px;
`
const P = styled.p`
    margin: 0.25em;
    padding: 0.5em;
`

const Menu = () => {
    const padding = {
        paddingRight: 5,
    }

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    // LOGOUT
    const handleLogout = () => {
        console.log('logout pressed')
        dispatch(logoutAction())
        dispatch(setNotification('Successfully logged out!', 5))
    }

    return (
        <div>
            <P>
                <Link style={padding} to="/">
                    Blogs 
                </Link>
                &nbsp;
                <Link style={padding} to="/users">
                    Users
                </Link>
                &nbsp;
                {user.name} is logged in
                <Button onClick={handleLogout}>Logout</Button>
            </P>
        </div>
    )
}

export default Menu
