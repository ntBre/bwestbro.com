import React from "react"
import { NavDropdown, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import Home from "./Home"
import Blog from "./Blog"
import Pubs from "./Pubs"
import About from "./About"
import SP18 from "./SP18"
import FA18 from "./FA18"
import SP19 from "./SP19"
import RunningLog from "./blogs/components/RunningLog"

class NavBar extends React.Component {
    render() {
	return (
	    <div>
	      <link
		rel="stylesheet"
		href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
		integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
		crossorigin="anonymous"
	      />
	      <Router>
		<Navbar bg="light" expand="lg">
		  <LinkContainer to="/">
		    <Navbar.Brand>Brent Westbrook</Navbar.Brand>
		  </LinkContainer>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
		    <Nav className="mr-auto">
		      <LinkContainer to="/">
			<Nav.Link href="/">Home</Nav.Link>
		      </LinkContainer>
		      <LinkContainer to="/blog">
			<Nav.Link href="/blog">Blog</Nav.Link>
		      </LinkContainer>
		      <LinkContainer to="/publications">
			<Nav.Link href="/pubs">Publications</Nav.Link>
		      </LinkContainer>
		      <LinkContainer to="/about">
			<Nav.Link href="/about">About</Nav.Link>
		      </LinkContainer>
		      <NavDropdown title="Courses" id="basic-nav-dropdown">
			<LinkContainer to="/sp18">
			  <NavDropdown.Item>CHEM 2320</NavDropdown.Item>
			</LinkContainer>
			<LinkContainer to="fa18">
			  <NavDropdown.Item>CHEM 2320</NavDropdown.Item>
			</LinkContainer>
			<LinkContainer to="sp19">
			  <NavDropdown.Item>CHEM 2327</NavDropdown.Item>
			</LinkContainer>
			{//  <NavDropdown.Divider />
			    // remove divider from dropdown menu
			}
		      </NavDropdown>
		    </Nav>
		  </Navbar.Collapse>
		</Navbar>
		<Route exact path="/" component={Home} />
		<Route exact path="/blog" component={Blog} />
		<Route exact path="/publications" component={Pubs} />
		<Route exact path="/about" component={About} />
		<Route exact path="/sp18" component={SP18} />
		<Route exact path="/fa18" component={FA18} />
		<Route exact path="/sp19" component={SP19} />
		<Route exact path="/blog/running-log" component={RunningLog} />
	      </Router>
	    </div>
	)
    }
}
export default NavBar
