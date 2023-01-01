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
    <form data-testid="form" onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          name='title'
          value={newTitle} //this needs to change too, more forms etc
          onChange={handleTitleChange}
          data-testid="title-input"
          id ="title"
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={newAuthor}
          name="author"
          onChange={handleAuthorChange}
          data-testid="author-input"
          id ="author"
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={newUrl}
          name="Username"
          onChange={handleUrlChange}
          data-testid="url-input"
          id ="url"
        />
      </div>
      <button type="submit" id="submit-blog">create</button>
    </form>
  )}


export default BlogForm