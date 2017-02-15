/**
 * Created by michel on 2/15/17.
 */

var DinnerOverViewController = function (view, model) {
    var editDinnerBtn = $("#edit-btn");
    var printRecipeBtn = $("#printButton");

    editDinnerBtn.on('click', function () {
       $("#container4").css("display", 'none');
       $("#container2").css("display", 'block');
       $("#view4").css("display", "none");
       $("#view3").css("display", "block");
    });

    printRecipeBtn.on('click', function () {
       $("#container4").css('display', 'none');
       $("#container5").css('display', 'block');
    });
};