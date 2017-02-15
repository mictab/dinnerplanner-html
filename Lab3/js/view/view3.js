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
    var dishListView = $("<div>").attr("id", "list-div").addClass("dish-list-listView");

    /* Initially, show all menus */
    var availableMenus = model.getAllDishesDisregardType();

    availableMenus.forEach(function (dish) {
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
    });

    function displayAvailableMenus() {
        availableMenus.forEach(function (dish) {
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
        });
    }

    function filterOutDishes() {
        var dishesThatShouldShow = model.getAllDishes(model.getDishType(), model.getSearchQuery());
        var dishes = dishesThatShouldShow.map(function(dish) {
           return dish.id;
        });

        var div = document.getElementById("list-div");
        var divs = div.getElementsByTagName("div");
        for (var j = 0; j < divs.length; j++) {
            if (dishes.indexOf(parseInt(divs[j].getAttribute("dish_id"))) != -1) {
                divs[j].style.display = "block";
            } else {
                divs[j].style.display = "none";
            }
        }

    }

    container
        .append(searchContainer)
        .append(dishListView);

    this.update = function(obj) {
        switch (obj) {
            case Events.SEARCH_CHANGED:
            case Events.DISH_TYPE_CHANGED:
                filterOutDishes();
                break;
            default:
                console.log(obj);
        }
    }
};
