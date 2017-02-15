$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	//And create the needed controllers and views
	model.addDishToMenu(1);
	model.addDishToMenu(2);
	var exampleView;
	if($("#view4").length){
		exampleView = new View4($("#view4"), model);
	}else if($("#view5").length){
		exampleView = new View5($("#view5"), model);
	}
});