import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlogThunk, removeBlogThunk} from "../reducers/blogReducer";

const Blog = ({blog, currentUserUsername}) => {
  const dispatch = useDispatch() 

  const removeBlog = (blog) => {
    const id = blog.id;
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlogThunk(id))
    }
  };

  const useLike = () => {
    const userObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    dispatch(updateBlogThunk(userObject,blog.id))
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle} class="blog">
      <div style={{ hideWhenVisible }}>
        <p>
          {blog.title} {blog.author}
        </p>
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {blog.url}
        <br />
        likes: {blog.likes}
        <button class="like" onClick={useLike}>
          like
        </button>
        <br />
        {blog.user.name}
        <br />
        {blog.user.username === currentUserUsername ? (
          <button onClick={() => removeBlog(blog)}>remove</button>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
