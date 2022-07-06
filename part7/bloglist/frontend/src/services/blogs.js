import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const create = async (newObject) => {
    try {
        const config = {
            headers: { Authorization: token },
        }
        console.log('token', token)

        const response = await axios.post(baseUrl, newObject, config)
        return response.data
    } catch (error) {
        if (error.response.data.error) {
            return error.response.data
        } else if (error.response.data) {
            return { error: error.response.data } // proxy errors
        } else {
            return { error: 'Unknown error' }
        }
    }
}

const updateLike = async (blog) => {
    try {
      const likedBlog = {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        user: blog.user ? blog.user._id : null,
        likes: blog.likes + 1
      }
        const response = await axios.put(`${baseUrl}/${blog.id}`, likedBlog)
        return response.data
    } catch (error) {
        if (error.response.data.error) {
            return error.response.data
        } else if (error.response.data) {
            return { error: error.response.data } // proxy errors
        } else {
            return { error: 'Unknown error' }
        }
    }
}

const removeBlog = async (id) => {
    try {
        const config = {
            headers: { Authorization: token },
        }

        const response = await axios.delete(`${baseUrl}/${id}`, config)
        return response.data
    } catch (error) {
        if (error.response.data.error) {
            return error.response.data
        } else if (error.response.data) {
            return { error: error.response.data } // proxy errors
        } else {
            return { error: 'Unknown error' }
        }
    }
}

export default { getAll, setToken, create, updateLike, removeBlog }
