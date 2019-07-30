import React from "react"
import { LinkContainer } from "react-router-bootstrap";

class Blog extends React.Component {
    render() {
	return (
	    <div>
	      <h1>Blog</h1>
	      <LinkContainer to="/blog/running-log">
		<a href="/blog/running-log">Running Log in Org-mode</a>
	      </LinkContainer>
	    </div>
	)
    }
}
export default Blog
