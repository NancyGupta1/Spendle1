import { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { ThemeContext } from '../context/ThemeContext';

const AppNavbar = ({ onLoginClick, isLoggedIn, onLogout, userName }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Navbar expand="lg" className="spendle-nav py-2">
      <Container fluid="lg">
        <Navbar.Brand href="#" className="fw-bold spendle-brand">
          💰 Spendle
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="nav-collapse" />
        <Navbar.Collapse id="nav-collapse">
          {isLoggedIn && (
            <Nav className="me-auto">
              <Nav.Link href="#summary" className="spendle-nav-link">Summary</Nav.Link>
              <Nav.Link href="#chart" className="spendle-nav-link">Analytics</Nav.Link>
              <Nav.Link href="#add" className="spendle-nav-link">Add</Nav.Link>
              <Nav.Link href="#history" className="spendle-nav-link">History</Nav.Link>
            </Nav>
          )}

          <div className="d-flex gap-3 align-items-center ms-auto">
            {isLoggedIn && userName && (
              <span className="nav-username d-none d-md-inline">👤 {userName}</span>
            )}
            <button className="nav-icon-btn" onClick={toggleTheme}>
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
            {!isLoggedIn ? (
              <button className="nav-icon-btn" onClick={onLoginClick}>Login</button>
            ) : (
              <button className="nav-icon-btn nav-icon-btn--danger" onClick={onLogout}>Logout</button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;