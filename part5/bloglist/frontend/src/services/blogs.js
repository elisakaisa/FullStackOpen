
import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  try {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  }
  catch (error) {
    if (error.response.data.error) {
      return error.response.data
    }
    else if (error.response.data) {
      return { error: error.response.data } // proxy errors
    }
    else {
      return { error: 'Unknown error' }
    }
  }
}

const updateLike = async (blog) => {

  try {
    console.log('uodateLike: try entered')
    const likedBlog = blog
    console.log('updateLike: likedBlog', likedBlog)
    likedBlog.likes = blog.likes + 1
    console.log(`${baseUrl}/${blog.id}`)
    const response = await axios.put(`${baseUrl}/${blog.id}`, likedBlog)
    console.log('respomse.data', response.data)
    return response.data
  }
  catch (error) {
    if (error.response.data.error) {
      return error.response.data
    }
    else if (error.response.data) {
      return { error: error.response.data } // proxy errors
    }
    else {
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
  }
  catch (error) {
    if (error.response.data.error) {
      return error.response.data
    }
    else if (error.response.data) {
      return { error: error.response.data } // proxy errors
    }
    else {
      return { error: 'Unknown error' }
    }
  }
}

export default { getAll, setToken, create, updateLike, removeBlog }