import { useParams, Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

function User({ user }) {
  return (
    <div className="secondaryElems">
      {user ? (
        <div className="blog">
          <h1 className="center">{user.name}</h1>
          {user.blogs.length ? (
            <div>
              <h2>Added blogs</h2>
              <ListGroup className="blogsScrollable">
                {user.blogs.map((blog) => (
                  <ListGroup.Item class action as={Link} to={`/blogs/${blog.id}`} key={blog.id}>
                    {blog.title}
                    {' '}
                    by
                    {' '}
                    {blog.author}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          ) : (
            <div>
              <h3 className="center">No blogs yet</h3>
            </div>
          )}
        </div>
      ) : (
        <h1>user not found</h1>
      )}
    </div>
  );
}

export default User;
