import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";

const Blog = ({blog, currentUserUsername}) => {
  return (
    <div>
        <div className ="links-container">
          <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
          <Link class="remove-underline" to={`/users/${blog.user.id}`}><i class="fa fa-user"></i> {blog.user.name}</Link>
      </div>
      by {blog.author}
      <p>{blog.likes} likes</p>
    </div>
  );
};

export default Blog;
