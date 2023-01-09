import { useParams } from "react-router-dom";

const User = ({ user }) => {
  return (
    <div>
      {user ? (
        <>
          <h1>{user.name}</h1>
          <h2>Added blogs</h2>
          {user.blogs.length ? (
            <ul>
              {user.blogs.map((blog) => (
                <li>{blog.title}</li>
              ))}
            </ul>
          ) : (
            <div>
              <h3>No blogs yet</h3>
            </div>
          )}
        </>
      ) : (
        <h1>user not found</h1>
      )}
    </div>
  );
};

export default User;
