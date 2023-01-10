import { useDispatch, useSelector } from "react-redux";
import {newBlog} from '../reducers/blogReducer'
import { setNotification } from "../reducers/notificationReducer";
import {setNewAuthor, setNewTitle, setNewUrl} from "../reducers/blogFormReducer"
import { Button } from "react-bootstrap";


const BlogForm = () => {

  const dispatch = useDispatch()

  const newTitle = useSelector(state => state.blogForm.newTitle);
  const newAuthor = useSelector(state => state.blogForm.newAuthor);
  const newUrl = useSelector(state => state.blogForm.newUrl);

  const handleAuthorChange = (event) => dispatch(setNewAuthor(event.target.value))
  const handleTitleChange = (event) =>dispatch(setNewTitle(event.target.value))
  const handleUrlChange = (event) => dispatch(setNewUrl(event.target.value))

  const addBlogForm = (event) => {
    event.preventDefault();
    const blogObject = {
      author: newAuthor,
      title: newTitle,
      url: newUrl,
    };
    dispatch(newBlog(blogObject)); //calling the thunk
    dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`,5000))

    dispatch(setNewAuthor(""));
    dispatch(setNewTitle(""));
    dispatch(setNewUrl(""));
  };

  return (
    <form data-testid="form" onSubmit={addBlogForm}>
      <div>
        title:
        <input
          type="text"
          name="title"
          value={newTitle}
          onChange={handleTitleChange}
          data-testid="title-input"
          id="title"
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={newAuthor}
          name="author"
          onChange={handleAuthorChange}
          data-testid="author-input"
          id="author"
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={newUrl}
          name="Username"
          onChange={handleUrlChange}
          data-testid="url-input"
          id="url"
        />
      </div>
      <Button type="submit" id="submit-blog">
        create
      </Button>
    </form>
  );
};

export default BlogForm;