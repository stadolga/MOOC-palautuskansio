import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";

const Blog = ({blog}) => {
  const id = blog.id
  const dispatch = useDispatch() 
  const visible = useSelector(state => state.visible)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} class="blog">
      <div>
        <p>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </p>
      </div>
    </div>
  );
};

export default Blog;
