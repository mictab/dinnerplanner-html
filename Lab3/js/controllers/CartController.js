/**
 * Created by michel on 2/15/17.
 */

var CartController = function (view, model) {

    $("#people").on('click change', function () {
        var value = $("#people").val();
        if (value != model.getNumberOfGuests()) {
            model.setNumberOfGuests(value);
        }
    });

    $("#confirm-button").on('click', function () {
        if (model.cartIsEmpty()) {
            alert("You have to pick dishes :)");
            return;
        }
        $("#container2").css("display", "none");
        $("#container4").css("display", "block");
    });

    $("#delete-starter").on('click', function () {
        deleteDishForType("starter");
    });

    $("#delete-main").on('click', function () {
        deleteDishForType("main dish");
    });

    $("#delete-dessert").on('click', function () {
        deleteDishForType("dessert");
    });

    var deleteDishForType = function (type) {
        if (model.cartIsEmpty()) {
            return;
        }
        var filt = model.getFullMenu().filter(function(dish) {
            return dish.type === type;
        });

        if (filt.length != 0) model.removeDishFromMenu(filt[0].id);
    }
};
