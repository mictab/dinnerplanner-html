$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	//And create the needed controllers and views
	model.addDishToMenu(1);
	model.addDishToMenu(2);
	var exampleView;
	var cartView;

	if($("#view1").length){
		exampleView = new View1($("#view1"), model);
	}

	if($("#view2").length){
        cartView = new View2($("#view2"), model);
	}

	if($("#view3").length){
        exampleView = new View3($("#view3"), model);
    }

    if($("#view4").length){
        exampleView = new View4($("#view4"), model);
    }

    if($("#view5").length){
        exampleView = new View5($("#view5"), model);
    }

    if($("#view6").length){
        exampleView = new View6($("#view6"), model);
    }
});