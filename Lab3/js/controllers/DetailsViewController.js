/**
 * Created by michel on 2/15/17.
 */

var DetailsViewsController = function (view, model) {

    $("#back-button").on('click', function () {
        console.log("YAY!");
        $("#view4").css("display", "none");
        $("#view3").css("display", "none");
        $("#container2").css("display", "none");
    });
};