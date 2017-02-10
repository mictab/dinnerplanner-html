<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dinner planner</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">

  </head>
  <body>
  	<div class="container-fluid">
		<!-- The Header displayed on every view -->
		<div id="header" class="row">
			<div class="col-xs-12 col-md-8 col-lg-12">
				<h1 id="title">HOMELETTE</h1>
				<h4 id="subtitle">From the best chefs in the world directly into your kitchen</h4>
			</div>
		</div>
		<div id="view5"></div>
	</div>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery.js"></script>
    <!-- Bootstrap JavaScript, needed if you want for instance tabs, models, popovers etc. -->
    <script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>

	<!-- The application JavaScript code -->
	<script src="js/app.js"></script>
	<script src="js/model/dinnerModel.js"></script>
	<script src="js/view/view5.js"></script>
	<script src="js/view/exampleViewController.js"></script>
  </body>
</html>