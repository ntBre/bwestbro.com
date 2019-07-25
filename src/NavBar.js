import React from "react"
import { Form, Button, NavDropdown, Navbar, Nav, FormControl } from 'react-bootstrap';
import Blog from "./Blog"

class NavBar extends React.Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Brent Westbrook</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#blog" onClick={() => Blog.handleClick()}>Blog</Nav.Link>
                        <Nav.Link href="#pubs">Publications</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                        <NavDropdown title="Courses" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#sp18">CHEM 2320</NavDropdown.Item>
                            <NavDropdown.Item href="#fa18">CHEM 2320</NavDropdown.Item>
                            <NavDropdown.Item href="#sp19">CHEM 2327</NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default NavBar