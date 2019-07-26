import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import brent from './images/brent.jpg';

function OldApp() {
	/* 
					*/
	return (
		<body>

			<div class="top-bar">
				<h1 class="header">bwestbro.com</h1>
			</div>
			<div class="main">
				<h1>About</h1>
				<img class="headshot" src={brent} alt="Brent" />
				<p>My name is Brent Westbrook, and I am currently
				  a graduate student at the University of
	      Mississippi. </p>

				<div class="publications">
					<h1>Publications</h1>
					<ul>
						<li>[1] B.R. Westbrook, K.M. Dreux, G.S. Tschumper,
						  J.S. Francisco and R.C. Fortenberry,
		  <em>PCCP</em>, (2018). Binding of the Atomic
																Cations Hydrogen through Argon to Water and
																Hydrogen Sulfide
		  <p><a
								href="http://dx.doi.org/10.1039/C8CP05378B">DOI
			Link</a></p></li>
						<li>[2]
						  R.C. Fortenberry, T. Trabelsi, B.R. Westbrook,
						  W.A. Del Rio, and J.S. Francisco,
		  <em>JCP</em>, (2019). Molecular Oxygen
																Generation from the reaction of water cations
		  with oxygen atoms <p><a
								href="https://aip.scitation.org/doi/full/10.1063/1.5102073">DOI
					Link</a></p></li></ul>
				</div>
			</div>
			<div class="spring-18 course">
				<h1>CHEM 2320 Spring 2018</h1>
				<h3>Worksheets</h3>


				<h3>Exam Reviews</h3>

			</div>

			<div class="fall-18 course">
				<h1>CHEM 2320 Fall 2018</h1>
				<h3>Worksheets</h3>


				<h3>Exam Reviews</h3>

			</div>

			<div class="spring-19 course">
				<h1>CHEM 2327 Spring 2019</h1>
				<h3>Worksheets</h3>


				<h3>Exam Reviews</h3>

				<h3>Answer Keys</h3>

				<h3>Supplements</h3>

			</div>
		</body>
	);
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
