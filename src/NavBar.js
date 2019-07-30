import React from "react"
import { NavDropdown, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IndexLinkContainer } from "react-router-bootstrap";
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
		  <IndexLinkContainer to="/">
		    <Navbar.Brand href="/">Brent Westbrook</Navbar.Brand>
		  </IndexLinkContainer>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
		    <Nav className="mr-auto">
		      <IndexLinkContainer to="/">
			<Nav.Link href="/">Home</Nav.Link>
		      </IndexLinkContainer>
		      <IndexLinkContainer to="/blog">
			<Nav.Link href="/blog">Blog</Nav.Link>
		      </IndexLinkContainer>
		      <IndexLinkContainer to="/publications">
			<Nav.Link href="/pubs">Publications</Nav.Link>
		      </IndexLinkContainer>
		      <IndexLinkContainer to="/about">
			<Nav.Link href="/about">About</Nav.Link>
		      </IndexLinkContainer>
		      <NavDropdown title="Courses" id="basic-nav-dropdown">
			<IndexLinkContainer to="/sp18">
			  <NavDropdown.Item>CHEM 2320</NavDropdown.Item>
			</IndexLinkContainer>
			<IndexLinkContainer to="fa18">
			  <NavDropdown.Item>CHEM 2320</NavDropdown.Item>
			</IndexLinkContainer>
			<IndexLinkContainer to="sp19">
			  <NavDropdown.Item>CHEM 2327</NavDropdown.Item>
			</IndexLinkContainer>
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
