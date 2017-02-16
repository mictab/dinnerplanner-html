/**
 * Created by michel on 2/15/17.
 */

var DetailsViewsController = function (view, model) {

    $("#back-button").on('click', function () {
        $("#view4").css("display", "none");
        $("#view3").css("display", "block");
    });

    $(".confirm-btn").on("click", function() {
    	model.addDishToMenu(model.getSelectedDishId());
    	$("#view4").css("display", "none");
        $("#view3").css("display", "block");
    });
};