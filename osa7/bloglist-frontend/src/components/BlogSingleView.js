import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateBlogThunk, removeBlogThunk, addCommentsThunk} from "../reducers/blogReducer";

const Blog = ({ blog,currentUserUsername}) => {
    const[comment,setComment] = useState("")
    const dispatch = useDispatch()

    const handleChange= (event) => {
        setComment(event.target.value)
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        dispatch(addCommentsThunk(blog.id,comment))
        setComment("")
    }

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

      if(!blog){
        return(
            <h1>Blog not found</h1>
        )
      }
      
      return (
        <div>
        <h1>{blog.title} {blog.author}</h1>
        <div>
        <a href={`https://${blog.url}`}>{blog.url}</a>
        <br/>
        likes: {blog.likes}
        <button className="like" type="submit" onClick={useLike}>
        like
        </button>
        <br/>
        added by {blog.user.name}
        {blog.user.username === currentUserUsername ? (
        <button onClick={() => removeBlog(blog)}>remove</button>
        ) : null}
        </div>
        <h2>comments</h2>
        <form onSubmit={handleSubmit}>
            <input name="comment" type="text" value={comment} onChange={handleChange}></input>
            <button type="submit">submit!</button>
        </form>
        {blog.comment.length === 0 ? <p>No comments yet.</p> : 
            <ul>
                {blog.comment.map((comm) => 
                <li key={comm._id}>{comm.comment}</li>
                )}
            </ul>
        }
        </div>
        );
        };
export default Blog;
