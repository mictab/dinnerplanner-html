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
};