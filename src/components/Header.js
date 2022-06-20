/*
Name: Lily Weber
Date: 13-June-2022
File: Header.js
Description: create the page header
*/
import {NavLink} from "react-router-dom";
import {Navbar, Nav, Container} from "react-bootstrap";
import logo from '../pages/dog-logo.png';
import {useAuth} from "../services/useAuth";

//This component creates a React-Bootstrap navbar. https://react-bootstrap.github.io/components/navbar/
const Header = () => {
    const className = ({ isActive }) => isActive ? "nav-link active" : "nav-link";
    const {isAuthed, user} = useAuth();
    return (
        <>
            <Navbar className="color-nav"  variant="dark" expand="sm">
                <Container>
                    <NavLink to="/">
                        <Navbar.Brand><img src={logo} alt="Logo"/>Dog Breeds</Navbar.Brand>
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className={className}>Home</NavLink>
                            <div className="nav-separator">|</div>

                            <NavLink to="/categories" className={className}>Breed Categories</NavLink>
                            <div className="nav-separator">|</div>
                            <NavLink to="/breeds" className={className}>Breeds</NavLink>

                            {isAuthed
                                ? <NavLink to="/signout" className={className}>Sign out</NavLink>
                                : <NavLink to="/signin" className={className}>Sign in/Sign up</NavLink>
                            }

                        </Nav>
                        {isAuthed && user ? <div className="navbar-name">
                            Welcome {user.name}!</div> : ""}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;