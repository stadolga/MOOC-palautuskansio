import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, removeBlog, currentUserUsername }) => {
  console.log(currentUserUsername,'!!!',blog.user.username)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? ''  : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const useLike = () => {
    console.log('here')
    const userObject = {
      user: blog.user.id,
      likes: likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    setLikes(likes+1)
    blogService.put(userObject,blog.id)
  }

  return(
    <div style = {blogStyle}>
      <div style={{ hideWhenVisible }}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br/>
    likes: {likes}<button onClick = {useLike}>like</button><br/>
        {blog.user.name}<br/>
        {blog.user.username === currentUserUsername ? (
          <button onClick={() => removeBlog(blog)}>remove</button>
        ) : null}
      </div>
    </div>
  )}

export default Blog