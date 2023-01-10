import Blog from '../components/Blog';
import BlogForm from '../components/BlogForm';
import Togglable from '../components/Togglable';
import {ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';


function BlogView({blogs}) {
    return (
      <div>
        <div>
          <h1 className="center">Blogs</h1>
        </div>
        <div>
          <Togglable>
            <BlogForm />
          </Togglable>
          <br />
          <ListGroup className="blogsScrollable">
            {blogs.map((blog) => (
              <ListGroup.Item action as={Link} to={`/blogs/${blog.id}`}>
                <Blog
                  key={blog.id}
                  blog={blog}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    );
  }

export default BlogView