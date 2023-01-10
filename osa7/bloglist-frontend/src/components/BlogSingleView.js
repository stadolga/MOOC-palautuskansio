import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateBlogThunk, removeBlogThunk, addCommentsThunk} from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";
import { Button, ListGroup } from "react-bootstrap";

const Blog = ({ blog,currentUserUsername}) => {
    const navigate = useNavigate()
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
        navigate('/')
        //lisää viesti että blogi on poistettu
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
        <div className="secondaryElems">
            <h1>{blog.title} by {blog.author}</h1>
            <div>
                <h3><a href={`https://${blog.url}`}>{blog.url}</a></h3>
                <br/>
                <h5>likes: {blog.likes}</h5>
                <Button type="submit" onClick={useLike}>
                like
                </Button>
                <br/>
                <h5>added by {blog.user.name}</h5>
                {blog.user.username === currentUserUsername ? (
                <Button onClick={() => removeBlog(blog)}>remove</Button>
                ) : null}
            </div>
            <h2>submit comment:</h2>
            <form onSubmit={handleSubmit}>
                <input name="comment" type="text" value={comment} onChange={handleChange}></input>
                <Button type="submit">submit!</Button>
            </form><br/>
            <div className ="commentsScrollable">
            {blog.comment.length === 0 ? <p>No comments yet.</p> : 
                <ListGroup>
                    {blog.comment.map((comm) => 
                    <div className="comments"><ListGroup.Item key={comm._id}>{comm.comment}</ListGroup.Item></div>
                    )}
                </ListGroup>
            }
            </div>
        </div>
        );
        };
export default Blog;
