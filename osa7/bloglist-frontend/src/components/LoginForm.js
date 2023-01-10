import { useDispatch, useSelector } from 'react-redux';
import {
  Form, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import { setNotification } from '../reducers/notificationReducer';
import { setPassword, setUsername, setUser } from '../reducers/loginReducer';
import loginService from '../services/loginService';
import blogService from '../services/blogService';

function LoginForm() {
  const dispatch = useDispatch();
  const handlePasswordChange = (event) => dispatch(setPassword(event.target.value));
  const handleUsernameChange = (event) => dispatch(setUsername(event.target.value));

  const username = useSelector((state) => state.login.username);
  const password = useSelector((state) => state.login.password);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');

      if (user) window.location.reload();
    } catch (exception) {
      dispatch(setNotification('error: wrong username or password', 5000));
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <h1>Login</h1>
      <FormGroup>
        <Form.Label>Username</Form.Label>
        <FormControl
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={handleUsernameChange}
        />
      </FormGroup>
      <FormGroup>
        <Form.Label>Password</Form.Label>
        <FormControl
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={handlePasswordChange}
        />
      </FormGroup>
      <Button type="submit" id="login-button">
        Login
      </Button>
    </Form>
  );
}

export default LoginForm;
