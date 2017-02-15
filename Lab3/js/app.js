$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	//And create the needed controllers and views
	var exampleView;
	var cartView;

	var homeScreenCtrl;
	var cartCtrl;
	var searchDisplayCtrl;
	var view3;
	var detailsViewCtrl;
	var view4;

	if($("#view1").length){
		exampleView = new View1($("#view1"), model);
        homeScreenCtrl = new HomeScreenController(exampleView, model);
	}

	if($("#view2").length){
        cartView = new View2($("#view2"), model);
        cartCtrl = new CartController(cartView, model);
	}

	if($("#view3").length){
        view3 = new View3($("#view3"), model);
        searchDisplayCtrl = new SearchDisplayController(view3, model);
    }

    if($("#view4").length){
        view4 = new View4($("#view4"), model);
        detailsViewCtrl = new DetailsViewsController(view4, model);
    }

    if($("#view5").length){
        exampleView = new View5($("#view5"), model);
    }

    if($("#view6").length){
        exampleView = new View6($("#view6"), model);
    }
});