import { useDispatch, useSelector } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';
import { logout } from '../../redux/actions/authActions';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const reduxDispatch = useDispatch();

  // To logout current logged in firebase user
  const handleLogout = () => {
    reduxDispatch(logout());
  };

  return (
    <>
      <Navbar
        expand='lg'
        className='justify-content-between align-items-center'
      >
        <Link to='/'>
          <img src={logo} alt='logo' className='logo' />
        </Link>

        <Nav>
          {user && (
            <>
              <NavDropdown title={user.name} id='collasible-nav-dropdown'>
                <Link className='nav-link' to='/orders'>
                  Orders
                </Link>

                <NavDropdown.Divider />
                <Button
                  className='nav-link'
                  style={{ cursor: 'pointer' }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </NavDropdown>
            </>
          )}
        </Nav>
      </Navbar>
      <hr />
    </>
  );
};

export default Header;
