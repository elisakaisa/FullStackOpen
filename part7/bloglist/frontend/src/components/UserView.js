import React from 'react'

const UserView = ({user}) => {
    //const navigate = useNavigate()
    
    if (!user) {
        return null
    }

    
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>Added blogs</h3>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default UserView
