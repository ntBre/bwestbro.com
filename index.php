<!DOCTYPE html>
<html>

<head>
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
<title>bwestbro.com</title>
<link rel="stylesheet" type="text/css" href="./site.css">
<link rel="icon" href="./resources/images/favicon.png" type="image/gif" sizes="16x16">
</head>

<?php
	function course_pop($files){
		$names = array();
		foreach ($files as $filename) {

			$base_name = basename($filename, ".pdf");

			if (substr($base_name, 0, 1) == 'w') {
				
				$name =  'Worksheet ' . str_replace("-", " ", substr($base_name, 1, strlen($base_name)));
				array_push($names, $name);
				echo "<p><a href=$filename>" . $name . "</a></p>";
			}

			elseif (substr($base_name, 0, 1) == 'e') {
				$name =  'Exam Review ' . substr($base_name, 1, 1);
				array_push($names, $name);
				echo "<p><a href=$filename>" . $name . "</a></p>";	
			}
			elseif (substr($base_name, 0, 1) == 'a') {
				$name =  'Answer Key ' . substr($base_name, 1, 1);
				array_push($names, $name);
				echo "<p><a href=$filename>" . $name . "</a></p>";	
			}
		}	
	}
?>

<body>

<div class="top-bar">
<h1 class="header">bwestbro.com</h1>
</div>

	<div class="main">
		<h1>About</h1>
		<img class="headshot" src="./resources/images/brent.jpg" alt="Brent">
		<p>My name is Brent Westbrook, and I am currently a senior chemistry major
		at St. Edward's University in Austin, Texas. I am also entering my fifth
		semester as a Supplemental Instructor at St. Edward's, which is probably why
		you are here. Feel free to explore the worksheets from this and previous 
		semesters to the left.</p>

		<div class="publications">
			<h1>Publications</h1>
			<ul>
			<li>[1] B.R. Westbrook, K.M. Dreux, G.S. Tschumper, J.S. Francisco and R.C. Fortenberry, <em>PCCP</em>, (2018). Binding of the Atomic Cations Hydrogen through Argon to Water and Hydrogen Sulfide
			<p><a href="http://dx.doi.org/10.1039/C8CP05378B">DOI Link</a></p></li>
			</ul>
		</div>
	</div>

	<div class="spring-18 course">
		<h1>CHEM 2320 Spring 2018</h1>
		<h3>Worksheets</h3>

		<?php
		$files = glob("./sp18/w*.pdf");
		course_pop($files);
		?>

		<h3>Exam Reviews</h3>
		<?php
				$files = glob("./sp18/e*.pdf");
				course_pop($files);
		?>

	</div>

	<div class="fall-18 course">
		<h1>CHEM 2320 Fall 2018</h1>
			<h3>Worksheets</h3>

			<?php
				$files = glob("./fa18/w*.pdf");
				course_pop($files);
			?>

			<h3>Exam Reviews</h3>

			<?php
				$files = glob("./fa18/e*.pdf");
				course_pop($files);
			?>
	</div>

	<div class="spring-19 course">
		<h1>CHEM 2327 Spring 2019</h1>
		<h3>Worksheets</h3>

			<?php
				$files = glob("./sp19/w*.pdf");
				course_pop($files);
			?>

			<h3>Exam Reviews</h3>

			<?php
				$files = glob("./sp19/e*.pdf");
				course_pop($files);
			?>
			<h3>Answer Keys</h3>

			<?php
				$files = glob("./sp19/a*.pdf");
				course_pop($files);
			?>
	</div>
	
</body>

</html>
