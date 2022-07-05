import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('Blog', () => {

  const blog = {
    title: 'title',
    author: 'author',
    url: 'www.someurl.com',
    likes: 89,
    user: '5e9ab00161ghtz4897cfd9d73'
  }
  const user = {
    name: 'Root User',
    username: 'root',
    id: '5e9ab00161ghtz4897cfd9d73'
  }
  const blogService = {
    updateLike: jest.fn()
  }
  const mockHandler = jest.fn()


  test('renders author and title, but not url', () => {
    const component = render(<Blog blog={blog} />)
    const div = component.container.querySelector('.blog')

    expect(div).toHaveTextContent('title by author')
    expect(div).not.toHaveTextContent('www.someurl.com')
  })

  test('toggled content is shown when button is clicked', () => {
    const component = render(<Blog blog={blog} user={user} deleteBlog={mockHandler} />)
    const button = component.getByText('View details')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('www.someurl.com')
    expect(div).toHaveTextContent('likes')
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const component = render(<Blog blog={blog} user={user} deleteBlog={mockHandler} blogService={blogService} />)
    const expandButton = component.getByText('View details')
    fireEvent.click(expandButton)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(blogService.updateLike.mock.calls).toHaveLength(2)
  })
})

