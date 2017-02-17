/**
 * Created by michel on 2/15/17.
 */

const View3 = function (container, model) {
    model.addObserver(this);

    container.addClass("dish-list-view");
    const searchContainer = $("<div>").addClass("dish-list-searchbar");

    /* Content of search container */
    const selectDishLabel = $("<h1>").text("SELECT DISH");
    const lineBreak = $("<hr>");
    const inputField = $("<input>").attr("type", "text").attr("placeholder", "Enter key words").attr("id", "input_field");
    const searchButton = $("<button>").addClass("btn btn-sm btn-primary").attr("id", "search-button").text("Search");

    const dishSelection = $("<select>").addClass("dish-selection").attr("id", "dish-select");
    dishSelection
        .append(
            $("<option>").attr("value", "starter").text("Starter")
        )
        .append(
            $("<option>").attr("value", "main course").text("Main Dish")
        )
        .append(
            $("<option>").attr("value", "dessert").text("Dessert")
        );

    /* Add stuff to search container */

    searchContainer
        .append(selectDishLabel)
        .append(lineBreak)
        .append(inputField)
        .append(searchButton)
        .append(dishSelection);

    /* Generate the list view */
    const dishListView = $("<div>").attr("id", "list-div").addClass("dish-list-listView");

    /* Initially, show all menus */
    function displayAvailableMenus(dishes) {
        dishes.forEach(function (dish) {
            const dishDiv = $("<div>").addClass("dish").attr("dish_id", dish.id);
            const image = $("<img>").attr("src", dish.image).addClass("dish-image");
            const title = $("<p>").addClass("dish-title")
                .append($("<strong>").text(dish.name));
            dishDiv
                .append(image)
                .append(title);
            dishListView.append(dishDiv);
        });
    }

    container
        .append(searchContainer)
        .append(dishListView);

    model.fetchAPIDishes(model.getDishType(), model.getSearchQuery());
    this.update = function (obj) {
        switch (obj) {
            case Events.DISH_TYPE_CHANGED:
            case Events.SEARCH_CHANGED:
                model.fetchAPIDishes();
                container.find("#list-div").empty();
                break;
            case Events.DISHES_CHANGED:
                displayAvailableMenus(model.getDishes());
                break;
        }
    }
};
