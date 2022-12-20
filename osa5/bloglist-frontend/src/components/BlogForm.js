import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newTitle, setNewTitle] = useState('')

  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      author: newAuthor,
      title: newTitle,
      url: newUrl
    }
    console.log(blogObject)
    createBlog(blogObject)
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }


  return(
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          name='title'
          value={newTitle} //this needs to change too, more forms etc
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={newAuthor}
          name="author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={newUrl}
          name="Username"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )}

export default BlogForm