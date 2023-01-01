import PropTypes from 'prop-types'

const LoginForm = ({ username,password,setUsername,setPassword, handleLogin }) => {

  LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

  return(
    <form onSubmit={handleLogin}>
      <div>
          username
        <input
          type="text"
          value={username}
          name="Username"
          id = "username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
          password
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id ="login-button">login</button>
    </form>
  )
}

export default LoginForm