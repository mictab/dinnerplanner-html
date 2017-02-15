/**
 * Created by michel on 2/15/17.
 */

var View3 = function (container, model) {
    model.addObserver(this);

    container.addClass("dish-list-view");

    var searchContainer = $("<div>").addClass("dish-list-searchbar");

    /* Content of search container */
    var selectDishLabel = $("<h1>").text("SELECT DISH");
    var lineBreak = $("<hr>");
    var inputField = $("<input>").attr("type", "text").attr("placeholder", "Enter key words").attr("id", "input_field");
    var searchButton = $("<button>").addClass("btn btn-sm btn-primary").attr("id", "search-button").text("Search");

    var dishSelection = $("<select>").addClass("dish-selection").attr("id", "dish-select");
    dishSelection
        .append(
            $("<option>").attr("value", "starter").text("Starter")
        )
        .append(
            $("<option>").attr("value", "main dish").text("Main Dish")
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
    var dishListView = $("<div>").addClass("dish-list-listView");

    /* Initially, show all menus */
    var availableMenus = model.getAllDishesDisregardType();

    availableMenus.forEach(function (dish) {
      var dishDiv = $("<div>").addClass("dish").attr("dish_id", dish.id).addClass(dish.type);
      var image = $("<img>").attr("src", "images/" + dish.image).addClass("dish-image");
            var stringText;
            if (dish.description.length > 150) {
                stringText = dish.description.substr(0, 150) + "...";
            } else {
                stringText = dish.description;
            }
            var title = $("<p>").addClass("dish-title")
                .append($("<strong>").text(dish.name));
            var text = $("<p>").addClass("dish-text")
                .append($("<strong>").text(stringText));
            dishDiv
                .append(image)
                .append(title)
                .append(text);
            dishListView.append(dishDiv);
    })

    function displayAvailableMenus() {
      if(!$(".dish-selection").val()) return;
      $(".dish").css("display", "none");
      var type = "." + ($(".dish-selection").val()).split(" ")[0];
      console.log($(type.split(" ")[0]));
      $(type).css("display", "flex");
        /*availableMenus.forEach(function (dish) {
            var dishDiv = $("<div>").addClass("dish").attr("dish_id", dish.id);
            var image = $("<img>").attr("src", "images/" + dish.image).addClass("dish-image");
            var stringText;
            if (dish.description.length > 150) {
                stringText = dish.description.substr(0, 150) + "...";
            } else {
                stringText = dish.description;
            }
            var title = $("<p>").addClass("dish-title")
                .append($("<strong>").text(dish.name));
            var text = $("<p>").addClass("dish-text")
                .append($("<strong>").text(stringText));
            dishDiv
                .append(image)
                .append(title)
                .append(text);
            dishListView.append(dishDiv);
        });*/
    }

    displayAvailableMenus();

    container
        .append(searchContainer)
        .append(dishListView);

    this.update = function(obj) {
        switch (obj) {
            case Events.SEARCH_CHANGED:
            case Events.DISH_TYPE_CHANGED:
                //dishListView.empty();
                availableMenus = model.getAllDishes(model.getDishType(), model.getSearchQuery());
                displayAvailableMenus();
                break;
            default:
                console.log(obj);
        }
    }
};
