$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	//And create the needed controllers and views

    /* Our views */
    var homeScreenView = new View1($("#view1"), model);
    var cartView = new View2($("#view2"), model);
	var searchView = new View3($("#view3"), model);
	var detailView = new View4($("#view4"), model);
	var dinnerOverviewView = new View5($("#view5"), model);
	var instructionsView = new View6($("#view6"), model);

	/* Our controllers */
	var homeScreenCtrl = new HomeScreenController(homeScreenView, model);
	var cartCtrl = new CartController(cartView, model);
	var searchDisplayCtrl = new SearchDisplayController(searchView, model);
	var detailsViewCtrl = new DetailsViewsController(detailView, model);
	var dinnerOverviewCtrl = new DinnerOverViewController(dinnerOverviewView, model);
	var instructionsViewCtrl = InstructionsScreenViewController(instructionsView, model);
});