import { setNotification } from "../reducers/notificationReducer";
import { setPassword,setUsername, setUser } from "../reducers/loginReducer";
import loginService from "../services/loginService";
import blogService from "../services/blogService";
import { useDispatch, useSelector } from "react-redux";


const LoginForm = () => {
  const dispatch = useDispatch()
  const handlePasswordChange = (event) => dispatch(setPassword(event.target.value))
  const handleUsernameChange = (event) =>dispatch(setUsername(event.target.value))

  const username = useSelector(state => state.login.username)
  const password = useSelector(state => state.login.password)

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername("")
      setPassword("")

      if(user) window.location.reload();
    } catch (exception) {
      dispatch(setNotification("error: wrong username or password", 5000));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  );
};

export default LoginForm;
