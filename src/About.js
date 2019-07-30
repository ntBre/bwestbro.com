import React from "react"
import brent from './images/brent.jpg';

function About() {
    return (
	<div>
	<h1>About</h1>
	<img src={brent} alt="Brent" />
	<p>My name is Brent Westbrook, and I am currently
	a graduate student at the University of
	Mississippi. </p>
	</div>
    )
}
export default About
