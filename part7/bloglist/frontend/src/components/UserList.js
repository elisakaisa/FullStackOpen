import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Table = styled.table`
    background: lightcyan;
    margin: 0.25em;
    padding: 1em;
    th, td, tr {
      padding: 1em;
    }
    table,
    th,
    td {
      border: 1px solid black;
      border-collapse: collapse;
    }
    th {
      text-align: left;
    }
`

const UserList = () => {

    const users = useSelector(state => state.users)

    return (
        <div>
            <h2>Users</h2>
            <Table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Blogs</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.name}>
                            <td><Link to={`/user/${user.id}`}>{user.name}</Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default UserList
