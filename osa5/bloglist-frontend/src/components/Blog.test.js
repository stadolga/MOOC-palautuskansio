import React from 'react'
import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

  let container
  beforeEach(() => {
    const createBlog = jest.fn()
    const blogObject = {
      author: 'Mikko',
      title: 'Double',
      url: 'goog.fi',
      likes: 0,
      user: {
        name: "markus",
        username: "minna"
      }
    }
    container = render(<Blog blog = {blogObject} removeBlog={createBlog} currentUserUsername="make"/>).container
  })


  test('at start the children are not displayed', () => {
    const element = screen.getByText("Double", { exact: false })
    expect(element).toBeDefined()
  })

  test('testing all data is shown after clicking the button',async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

//   test('clicking the like button calls event handler function twice', () => {
//     const mockHandler = jest.fn()
//     const user = userEvent.setup()
//     const button = screen.getByText('view')
//     user.click(button)
  
//     const likeButton = screen.getByText('like')
//     likeButton.onClick = mockHandler
//     user.click(likeButton)
//     user.click(likeButton)
  
//     expect(mockHandler.mock.calls.length).toBe(2)
//   })

// test('BlogForm calls createBlog with the correct arguments', () => {
//     const createBlog = jest.fn()
  
//     render(<BlogForm createBlog={createBlog} />)
  
//     const titleInput = screen.getByTestId('title-input')
//     const authorInput = screen.getByTestId('author-input')
//     const urlInput = screen.getByTestId('url-input')
//     const form = screen.getByTestId('form')
  
//     act(() => {
//       userEvent.type(titleInput, 'Test Title')
//       userEvent.type(authorInput, 'Test Author')
//       userEvent.type(urlInput, 'http://testurl.com')
//     })
  
//     act(() => {
//       userEvent.click(form)
//     })
  
//     expect(createBlog).toHaveBeenCalledWith({
//       author: 'Test Author',
//       title: 'Test Title',
//       url: 'http://testurl.com',
//     })
//   })
