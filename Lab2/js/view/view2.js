/**
 * Created by michel on 2/15/17.
 */

var View2 = function (container, model) {
    container.addClass("cart");

    var myDinner = $("<h4>").addClass("from-left").text("My Dinner");
    var label = $("<label>").addClass("from-left").attr("for", "people").text("People");
    var usrInput = $("<input>").attr("type", "number").attr("name", "people").attr("id", "people").attr("value", model.getNumberOfGuests());

    var tableHead = $("<div>").addClass("table-head").append($("<span>").text("Dish Name")).append($("<span>").text("Cost"));

    var listOfDishes = $("<ul>").addClass("from-left list-of-dishes");
    model.getFullMenu().forEach(function (dish) {
        var li = $("<li>").addClass("table-row");
        li.append($("<span>").text(dish.name));
        li.append($("<span>").text(model.getDishPrice(dish.id)));
        listOfDishes.append(li);
    });

    var lineBreak = $("<hr>");
    var totalPrice = $("<div>")
        .addClass("total-price from-left")
        .append($("<p>")
            .append(
                $("<span>")
                    .text("SEK "))
            .append($("<span>")
                .text(model.getTotalMenuPrice())
            )
        );

    var confirmButton = $("<button>")
        .addClass("btn btn-large btn-primary")
        .attr("type", "button")
        .attr("id", "confirm-button")
        .text("Confirm Dinner");


    container
        .append(myDinner)
        .append(label)
        .append(usrInput)
        .append(tableHead)
        .append(listOfDishes)
        .append(lineBreak)
        .append(totalPrice)
        .append(confirmButton);
};