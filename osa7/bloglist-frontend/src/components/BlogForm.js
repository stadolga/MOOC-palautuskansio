import { useDispatch, useSelector } from 'react-redux';
import {Form, Button, FormGroup, FormControl, FormLabel,} from 'react-bootstrap';

import { newBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { setNewAuthor, setNewTitle, setNewUrl } from '../reducers/blogFormReducer';

function BlogForm() {
  const dispatch = useDispatch();

  const newTitle = useSelector((state) => state.blogForm.newTitle);
  const newAuthor = useSelector((state) => state.blogForm.newAuthor);
  const newUrl = useSelector((state) => state.blogForm.newUrl);

  const handleAuthorChange = (event) => dispatch(setNewAuthor(event.target.value));
  const handleTitleChange = (event) => dispatch(setNewTitle(event.target.value));
  const handleUrlChange = (event) => dispatch(setNewUrl(event.target.value));

  const addBlogForm = (event) => { //add blog by calling the NewBlog-Thunk
    event.preventDefault();

    const blogObject = {
      author: newAuthor,
      title: newTitle,
      url: newUrl,
    };

    dispatch(newBlog(blogObject)); // calling the thunk
    dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 5000));

    dispatch(setNewAuthor(''));
    dispatch(setNewTitle(''));
    dispatch(setNewUrl(''));
  };

  return (
    <Form data-testid="form" onSubmit={addBlogForm}>
      <FormGroup>
        <FormLabel>
          <h5>
            <i className="fa fa-font" />
            {' '}
            Title
          </h5>
        </FormLabel>
        <FormControl
          type="text"
          name="title"
          value={newTitle}
          onChange={handleTitleChange}
          data-testid="title-input"
          id="title"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>
          <h5>
            <i className="fa fa-pencil" />
            {' '}
            Author
          </h5>
        </FormLabel>
        <FormControl
          type="text"
          value={newAuthor}
          name="author"
          onChange={handleAuthorChange}
          data-testid="author-input"
          id="author"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>
          <h5>
            <i className="fa fa-globe" />
            {' '}
            URL
          </h5>
        </FormLabel>
        <FormControl
          type="text"
          value={newUrl}
          name="Username"
          onChange={handleUrlChange}
          data-testid="url-input"
          id="url"
        />
      </FormGroup>
      <Button type="submit" id="submit-blog">
        create
      </Button>
    </Form>
  );
}

export default BlogForm;
