$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	//And create the needed controllers and views
	model.addDishToMenu(1);
	model.addDishToMenu(2);
	var exampleView = new View6($("#view6"), model);

});