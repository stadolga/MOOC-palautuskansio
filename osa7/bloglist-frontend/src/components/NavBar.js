import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const handleLogOut = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    window.location.reload();
  };

function NavBar({ user}) {
  const padding = {
    paddingRight: 5,
  };
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {user ? (
              <em>
                {user.name}
                {' '}
                logged in
              </em>
            ) : <Link to="/login">login</Link>}
          </Navbar.Text>
          {user && (
            <Nav.Link href="#" as="span" onClick={handleLogOut}>
              logout
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
