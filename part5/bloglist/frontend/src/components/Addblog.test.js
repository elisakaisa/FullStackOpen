import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Addblog from './Addblog'

test('Add Blog form test', () => {

  const blog = {
    title: 'title',
    author: 'author',
    url: 'www.someurl.com'
  }

  const mockHandler = jest.fn()
  const component = render(<Addblog createBlog={mockHandler} />)

  // find fields with id
  const fieldTitle = component.container.querySelector('#title')
  const fieldAuthor = component.container.querySelector('#author')
  const fieldUrl = component.container.querySelector('#url')

  // fill in with data
  fireEvent.change(fieldTitle, { target: { value: blog.title } })
  fireEvent.change(fieldAuthor, { target: { value: blog.author } })
  fireEvent.change(fieldUrl, { target: { value: blog.url } })

  // submit
  const form = component.container.querySelector('form')
  fireEvent.submit(form)

  // check that event handler is called
  expect(mockHandler.mock.calls).toHaveLength(1)

  // check for correct data
  expect(mockHandler.mock.calls[0][0].title).toEqual(blog.title)
  expect(mockHandler.mock.calls[0][0].author).toEqual(blog.author)
  expect(mockHandler.mock.calls[0][0].url).toEqual(blog.url)
  expect(mockHandler.mock.calls[0][0].likes).toEqual(0)
})