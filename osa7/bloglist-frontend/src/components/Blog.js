import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, removeBlog, currentUserUsername, setBlogs }) => {

  const useLike = () => {
    const userObject = {
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    setLikes(likes + 1);
    blogService.put(userObject, blog.id).then(() => {
      // get updated list of blogs
      blogService.getAll().then((blogs) => {
        // sort the list of blogs by likes
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
        // update the state with the sorted list of blogs
        setBlogs(sortedBlogs);
      });
    });
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
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
        likes: {likes}
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
