const View4 = function (container, model) {
    model.addObserver(this);

    let dish = model.getSelectedDish();
    let dishDetailView = $("<div>").addClass("dish-detail-view");
    let dishInfoAndIngredients = $("<div>").addClass("dish-info-and-ingredients");
    let dishInfo = $("<div>").addClass("dish-info");
    let dishInfoBox = $("<div>").addClass("dish-info-box");
    dishDetailView.append(dishInfoAndIngredients.append(dishInfo.append(dishInfoBox)));
    dishInfoBox.append($("<h3>").addClass("lasagne-title").append($("<strong>").text(dish.name)));
    dishInfoBox.append($("<img>").addClass("dish-image").attr("src", dish.image));
    dishInfoBox.append($("<p>").addClass("lasagne-text").text(dish.name));
    dishInfoBox.append($("<button>").addClass("btn btn-ms btn-primary back-to-dish").attr("id", "back-button").text("Back to Select Dish"));

    let dishIngredients = $("<div>").addClass("dish-ingredients");
    dishIngredients.append($("<h3>").text("INGREDIENTS FOR " + model.getNumberOfGuests() + " PEOPLE"));
    dishIngredients.append($("<hr>"));
    let table = $("<table>").addClass("from-left list-of-dishes");
    let tbody = $("<tbody>");
    table.append(tbody);
    dish.ingredients.forEach(function (i) {
        let tr = $("<tr>");
        tr.append($("<td>").text(Math.round((i.amount / dish.servings) * model.numberOfGuests * 100) / 100 + " " + i.unit));
        tr.append($("<td>").text(i.name));
        tr.append($("<td>").text("SEK " + (i.amount / dish.servings) * model.numberOfGuests));
        tbody.append(tr);
    });

    dishIngredients.append(table);
    dishInfoAndIngredients.append(dishIngredients);

    dishIngredients.append($("<hr>"));

    let confirmButton = $("<div>").addClass("confirm-row");
    confirmButton.append($("<button>").addClass("btn btn-ms btn-primary confirm-btn").text("Confirm Dish"));
    confirmButton.append($("<p>").text("SEK " + (model.getDishPrice(model.getSelectedDishId()) * model.getNumberOfGuests())));

    dishIngredients.append(confirmButton);

    let dishPreparations = $("<div>").addClass("dish-preparations");
    dishPreparations.append($("<h2>").text("PREPARATION"));
    dishPreparations.append($("<p>").addClass("preparation-text").text(dish.instructions));

    dishDetailView.append(dishPreparations);

    container.append(dishDetailView);


    function properUpdate() {
        $(".dish-info-box h3").text(dish.name);
        $(".dish-info-box img").attr("src", dish.image);
        $(".dish-info-box .lasagne-text").text(dish.name);

        $(".dish-ingredients h3").text("INGREDIENTS FOR " + model.numberOfGuests + " PEOPLE");
        let tbody = $(".dish-ingredients tbody");
        tbody.empty();
        dish.ingredients.forEach(function (i) {
            let tr = $("<tr>");
            tr.append($("<td>").text(Math.round((i.amount / dish.servings) * model.numberOfGuests * 100) / 100 + " " + i.unit));
            tr.append($("<td>").text(i.name));
            tr.append($("<td>").text("SEK " + (i.amount * model.numberOfGuests)));
            tbody.append(tr);
        });
        $(".dish-ingredients .confirm-row p").text("SEK " + 5 * model.getNumberOfGuests());
        $(".dish-preparations p").text(dish.instructions);

    }

    this.update = function (obj) {
        switch (obj) {
            case Events.USER_SELECTED_DISH:
            case Events.GUESTS_CHANGED:
                dish = model.getSelectedDish();
                properUpdate();
                break;
        }
    }
};