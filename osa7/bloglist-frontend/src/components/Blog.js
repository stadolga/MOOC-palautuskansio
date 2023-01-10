import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";

const Blog = ({blog, currentUserUsername}) => {
  return (
    <div>
        <div>
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author} </Link>
          <Link to={`/users/${blog.user.id}`}><i class="fa fa-user"></i>{blog.user.name}</Link>
      </div>
    </div>
  );
};

export default Blog;
