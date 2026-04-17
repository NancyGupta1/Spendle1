import { useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { ThemeContext } from '../context/ThemeContext';

const AppNavbar = ({ onLoginClick, isLoggedIn, onLogout, userName }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Navbar expand="lg" className="spendle-nav shadow-sm py-2" bg={theme} data-bs-theme={theme}>
      <Container fluid="lg">
        <Navbar.Brand href="#" className="fw-bold spendle-brand">
          💰 Spendle
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="nav-collapse" />
        <Navbar.Collapse id="nav-collapse">
          {isLoggedIn && (
            <Nav className="me-auto">
              <Nav.Link href="#summary">Summary</Nav.Link>
              <Nav.Link href="#chart">Analytics</Nav.Link>
              <Nav.Link href="#add">Add</Nav.Link>
              <Nav.Link href="#history">History</Nav.Link>
            </Nav>
          )}

          <div className="d-flex gap-2 align-items-center ms-auto">
            {isLoggedIn && userName && (
              <span className="nav-username d-none d-md-inline">👤 {userName}</span>
            )}

            <Button
              variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
              size="sm"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </Button>

            {!isLoggedIn ? (
              <Button variant="outline-primary" size="sm" onClick={onLoginClick}>
                Login
              </Button>
            ) : (
              <Button variant="outline-danger" size="sm" onClick={onLogout}>
                Logout
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
