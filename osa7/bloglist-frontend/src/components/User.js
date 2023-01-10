import { useParams } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const User = ({ user }) => {
  return (
    <div className ="secondaryElems">
      {user ? (
        <div className="blog">
          <h1>{user.name}</h1>
          <h2>Added blogs</h2>
          {user.blogs.length ? (
            <ListGroup className="blogsScrollable">
              {user.blogs.map((blog) => (
                <ListGroup.Item key = {blog.id}>{blog.title}</ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <div>
              <h3>No blogs yet</h3>
            </div>
          )}
        </div>
      ) : (
        <h1>user not found</h1>
      )}
    </div>
  );
};

export default User;
