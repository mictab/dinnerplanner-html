/**
 * Created by michel on 2/15/17.
 */

const View2 = function (container, model) {
    model.addObserver(this);

    container.addClass("cart");

    let myDinner = $("<h4>").addClass("from-left").text("My Dinner");
    let label = $("<label>").addClass("from-left").attr("for", "people").text("People");
    let usrInput = $("<input>").attr("type", "number").attr("name", "people").attr("id", "people").attr("value", model.getNumberOfGuests());

    let tableHead = $("<div>").addClass("table-head").append($("<span>").text("Dish Name")).append($("<span>").text("Cost"));

    let listOfDishes = $("<ul>").addClass("from-left list-of-dishes");

    function updateCart() {
        model.getFullMenu().forEach(function (dish) {
            let li = $("<li>").addClass("table-row");
            li.append($("<span>").text(dish.name));
            li.append($("<span>").text(Math.round(dish.price * model.numberOfGuests * 100) / 100));
            listOfDishes.append(li);
        });
    }

    let lineBreak = $("<hr>");
    let totalPrice = $("<div>")
        .addClass("total-price from-left")
        .append($("<p>")
            .append(
                $("<span>")
                    .text("SEK "))
            .append($("<span>").addClass("totalPrice")
                .text(model.getTotalMenuPrice())
            )
        );

    let confirmButton = $("<button>")
        .addClass("btn btn-large btn-primary")
        .attr("type", "button")
        .attr("id", "confirm-button")
        .text("Confirm Dinner");

    let deleteStarter = $("<button>")
        .addClass("btn btn-large btn-primary")
        .attr("type", "button")
        .attr("id", "delete-starter")
        .text("Delete Starter");

    let deleteMain = $("<button>")
        .addClass("btn btn-large btn-primary")
        .attr("type", "button")
        .attr("id", "delete-main")
        .text("Delete Main");

    let deleteDessert = $("<button>")
        .addClass("btn btn-large btn-primary")
        .attr("type", "button")
        .attr("id", "delete-dessert")
        .text("Delete Dessert");

    container
        .append(myDinner)
        .append(label)
        .append(usrInput)
        .append(tableHead)
        .append(listOfDishes)
        .append(lineBreak)
        .append(totalPrice)
        .append(confirmButton)
        .append(deleteStarter)
        .append(deleteMain)
        .append(deleteDessert);

    this.update = function (obj) {
        switch (obj) {
            case Events.GUESTS_CHANGED:
            case Events.MENU_CHANGED:
                usrInput.attr("value", model.getNumberOfGuests());
                listOfDishes.empty();
                updateCart();
                $(".totalPrice").text(model.getTotalMenuPrice());
                break;
        }
    }
};
