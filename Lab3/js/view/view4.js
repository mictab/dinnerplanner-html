var View4 = function(container, model){
	model.addObserver(this);

	var dish = model.getDish(model.getSelectedDishId());

    function updateHTML() {
        var dishDetailView = $("<div>").addClass("dish-detail-view");
        var dishInfoAndIngredients = $("<div>").addClass("dish-info-and-ingredients");
        var dishInfo = $("<div>").addClass("dish-info");
        var dishInfoBox = $("<div>").addClass("dish-info-box");
        dishDetailView.append(dishInfoAndIngredients.append(dishInfo.append(dishInfoBox)));
        dishInfoBox.append($("<h3>").addClass("lasagne-title").append($("<strong>").text(dish.name)));
        dishInfoBox.append($("<img>").addClass("dish-image").attr("src", "images/" + dish.image));
        dishInfoBox.append($("<p>").addClass("lasagne-text").text(dish.description));
        dishInfoBox.append($("<button>").addClass("btn btn-ms btn-primary back-to-dish").attr("id", "back-button").text("Back to Select Dish"));

        var dishIngredients = $("<div>").addClass("dish-ingredients");
        dishIngredients.append($("<h3>").text("INGREDIENTS FOR " + model.getNumberOfGuests() + " PEOPLE"));
        dishIngredients.append($("<hr>"));
        var table = $("<table>").addClass("from-left list-of-dishes");
        var tbody = $("<tbody>");
        table.append(tbody);
        dish.ingredients.forEach(function (i) {
            var tr = $("<tr>");
            tr.append($("<td>").text(Math.round(i.quantity * model.numberOfGuests * 100) / 100 + " " + i.unit));
            tr.append($("<td>").text(i.name));
            tr.append($("<td>").text("SEK " + (i.price * model.numberOfGuests)));
            tbody.append(tr);
        });

        dishIngredients.append(table);
        dishInfoAndIngredients.append(dishIngredients);

        dishIngredients.append($("<hr>"));

        var confirmButton = $("<div>").addClass("confirm-row");
        confirmButton.append($("<button>").addClass("btn btn-ms btn-primary confirm-btn").text("Confirm Dish"));
        confirmButton.append($("<p>").text("SEK " + (model.getDishPrice(model.getSelectedDishId())*model.getNumberOfGuests())));

        dishIngredients.append(confirmButton);

        var dishPreparations = $("<div>").addClass("dish-preparations");
        dishPreparations.append($("<h2>").text("PREPARATION"));
        dishPreparations.append($("<p>").addClass("preparation-text").text(dish.description));

        dishDetailView.append(dishPreparations);

        container.append(dishDetailView);
    }

    updateHTML();

    function properUpdate(){
    	var dish = model.getDish(model.getSelectedDishId());
    	$(".dish-info-box h3").text(dish.name);
    	$(".dish-info-box img").attr("src", "images/" + dish.image);
    	$(".dish-info-box .lasagne-text").text(dish.description);

    	$(".dish-ingredients h3").text("INGREDIENTS FOR " + model.numberOfGuests + " PEOPLE");
    	var tbody = $(".dish-ingredients tbody");
    	tbody.empty();
    	dish.ingredients.forEach(function (i) {
            var tr = $("<tr>");
            tr.append($("<td>").text(Math.round(i.quantity * model.numberOfGuests * 100) / 100 + " " + i.unit));
            tr.append($("<td>").text(i.name));
            tr.append($("<td>").text("SEK " + (i.price * model.numberOfGuests)));
            tbody.append(tr);
        });
        $(".dish-ingredients .confirm-row p").text("SEK " + (model.getDishPrice(model.getSelectedDishId())*model.getNumberOfGuests()));
        console.log(model.getDishPrice(model.getSelectedDishId()))

        $(".dish-preparations p").text(dish.description);

    }

	this.update = function(obj) {
		switch (obj) {
            case Events.USER_SELECTED_DISH:
            case Events.GUESTS_CHANGED:
                dish = model.getDish(model.getSelectedDishId());
                properUpdate();
                break;
			default:
				console.log(obj);
        }
	}
};