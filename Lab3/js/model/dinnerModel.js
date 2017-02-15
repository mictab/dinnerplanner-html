'use strict';

const Events = {
    GUESTS_CHANGED: "guests_changed",
    DISH_TYPE_CHANGED: "dish_type_changed",
    SEARCH_CHANGED: "search_changed",
    USER_SELECTED_DISH: "user_selected_dish",
    MENU_CHANGED: "menu_changed"
};

//DinnerModel Object constructor
var DinnerModel = function () {

    this.numberOfGuests = 1;
    this.menu = [];
    this.dinnerTitle = "A Home Dinner Service";
    this.startDescription = "Lorem ipsum dolor sit omet Lorem ipsum dolor sit omet Lorem ipsum dolor sit omet Lorem ipsum dolor sitsi tomet Lorem";
    this.observers = [];
    this.selectedDishType = "";
    this.selectedDishId = 1;
    this.searchQuery = "";

    // Labb 3
    this.addObserver = function(observer) {
        this.observers.push(observer);
    };

    this.notifyObservers = function(obj) {
        for (var i = 0; i < this.observers.length; i++) {
            console.log(this.observers[i]);
            this.observers[i].update(obj);
        }
    };

    this.setNumberOfGuests = function (num) {
        if (num > 0) {
            this.numberOfGuests = num;
        }
        this.notifyObservers(Events.GUESTS_CHANGED);
    };

    this.setSearchQuery = function(s) {
        this.searchQuery = s;
        this.notifyObservers(Events.SEARCH_CHANGED)
    };

    this.getSearchQuery = function() {
        return this.searchQuery;
    };

    this.getDishType = function() {
        return this.selectedDishType;
    };

    this.getSelectedDishId = function() {
        return this.selectedDishId;
    };

    this.setDishType = function(type) {
        this.selectedDishType = type;
        this.notifyObservers(Events.DISH_TYPE_CHANGED);
    };

    this.setSelectedDishId = function(id) {
        this.selectedDishId = parseInt(id);
        this.notifyObservers(Events.USER_SELECTED_DISH);
    };

    // should return
    this.getNumberOfGuests = function () {
        return this.numberOfGuests;
    };

    //Returns the dish that is on the menu for selected type
    this.getSelectedDish = function (type) {
        for (var i = 0; i < this.menu.length; i++) {
            if (type === this.menu[i].type) {
                return this.menu[i];
            }
        }
    };

    //Returns all the dishes on the menu.
    this.getFullMenu = function () {
        return this.menu;
    };

    this.getDishPrice = function (id) {
        var totalDishPrice = 0;
        for (var i = 0; i < dishes.length; i++) {
            if(dishes[i].id === id) {
                for (var j = 0; j < dishes[i].ingredients.length; j++) {
                    totalDishPrice += dishes[i].ingredients[j].price;
                }
            }

        }
        return totalDishPrice;
    };

    //Returns all ingredients for all the dishes on the menu.
    this.getAllIngredients = function () {
        var ingredients = [];
        for (var i = 0; i < this.menu.length; i++) {
            for (var j = 0; j < this.menu[i].ingredients; j++) {
                ingredients.push(this.menu[i].ingredients[j]);
            }
        }
        return ingredients;
    };

    //Returns the total price of the menu (all the ingredients multiplied by number of guests).
    this.getTotalMenuPrice = function () {
        var sum = 0;
        for (var i = 0; i < this.menu.length; i++) {
            for (var j = 0; j < this.menu[i].ingredients.length; j++) {
                sum += this.menu[i].ingredients[j].price;
            }
        }
        return sum * this.numberOfGuests;
    };

    //Adds the passed dish to the menu. If the dish of that type already exists on the menu
    //it is removed from the menu and the new one added.
    this.addDishToMenu = function (id) {
        for (var i = 0; i < dishes.length; i++) {
            if (dishes[i].id === id) {
                // Remove old
                this.menu.splice(i, 1);
                // Add new
                this.menu.push(dishes[i]);
            }
        }
        this.notifyObservers(Events.MENU_CHANGED);
    };

    //Removes dish from menu
    this.removeDishFromMenu = function (id) {
        for (var i = 0; i < this.menu.length; i++) {
            if (this.menu[i].id === id) {
                this.menu.splice(i, 1);
            }
        }
        this.notifyObservers(Events.MENU_CHANGED);
    };

    this.cartIsEmpty = function() {
      return this.menu.length == 0;
    };

    //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
    //you can use the filter argument to filter out the dish by name or ingredient (use for search)
    //if you don't pass any filter all the dishes will be returned
    this.getAllDishes = function (type, filter) {
        return dishes.filter(function (dish) {
            var found = true;
            if (filter) {
                found = false;
                dish.ingredients.forEach(function (ingredient) {
                    if (ingredient.name.indexOf(filter) != -1) {
                        found = true;
                    }
                });
                if (dish.name.indexOf(filter) != -1) {
                    found = true;
                }
            }
            return dish.type == type && found;
        });
    };

    this.getAllDishesDisregardType = function() {
      return dishes;
    };

    //function that returns a dish of specific ID
    this.getDish = function (id) {
        for (var key in dishes) {
            if (dishes[key].id == id) {
                return dishes[key];
            }
        }
    };


    // the dishes variable contains an array of all the
    // dishes in the database. each dish has id, name, type,
    // image (name of the image file), description and
    // array of ingredients. Each ingredient has name,
    // quantity (a number), price (a number) and unit (string
    // defining the unit i.e. "g", "slices", "ml". Unit
    // can sometimes be empty like in the example of eggs where
    // you just say "5 eggs" and not "5 pieces of eggs" or anything else.
    var dishes = [{
        'id': 1,
        'name': 'French toast',
        'type': 'starter',
        'image': 'toast.jpg',
        'description': "In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
        'ingredients': [{
            'name': 'eggs',
            'quantity': 0.5,
            'unit': '',
            'price': 10
        }, {
            'name': 'milk',
            'quantity': 30,
            'unit': 'ml',
            'price': 6
        }, {
            'name': 'brown sugar',
            'quantity': 7,
            'unit': 'g',
            'price': 1
        }, {
            'name': 'ground nutmeg',
            'quantity': 0.5,
            'unit': 'g',
            'price': 12
        }, {
            'name': 'white bread',
            'quantity': 2,
            'unit': 'slices',
            'price': 2
        }]
    }, {
        'id': 2,
        'name': 'Sourdough Starter',
        'type': 'starter',
        'image': 'sourdough.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'active dry yeast',
            'quantity': 0.5,
            'unit': 'g',
            'price': 4
        }, {
            'name': 'warm water',
            'quantity': 30,
            'unit': 'ml',
            'price': 0
        }, {
            'name': 'all-purpose flour',
            'quantity': 15,
            'unit': 'g',
            'price': 2
        }]
    }, {
        'id': 3,
        'name': 'Baked Brie with Peaches',
        'type': 'starter',
        'image': 'bakedbrie.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'round Brie cheese',
            'quantity': 10,
            'unit': 'g',
            'price': 8
        }, {
            'name': 'raspberry preserves',
            'quantity': 15,
            'unit': 'g',
            'price': 10
        }, {
            'name': 'peaches',
            'quantity': 1,
            'unit': '',
            'price': 4
        }]
    }, {
        'id': 100,
        'name': 'Meat balls',
        'type': 'main dish',
        'image': 'meatballs.jpg',
        'description': "Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
        'ingredients': [{
            'name': 'extra lean ground beef',
            'quantity': 115,
            'unit': 'g',
            'price': 20
        }, {
            'name': 'sea salt',
            'quantity': 0.7,
            'unit': 'g',
            'price': 3
        }, {
            'name': 'small onion, diced',
            'quantity': 0.25,
            'unit': '',
            'price': 2
        }, {
            'name': 'garlic salt',
            'quantity': 0.7,
            'unit': 'g',
            'price': 2
        }, {
            'name': 'Italian seasoning',
            'quantity': 0.6,
            'unit': 'g',
            'price': 3
        }, {
            'name': 'dried oregano',
            'quantity': 0.3,
            'unit': 'g',
            'price': 3
        }, {
            'name': 'crushed red pepper flakes',
            'quantity': 0.6,
            'unit': 'g',
            'price': 3
        }, {
            'name': 'Worcestershire sauce',
            'quantity': 6,
            'unit': 'ml',
            'price': 7
        }, {
            'name': 'milk',
            'quantity': 20,
            'unit': 'ml',
            'price': 4
        }, {
            'name': 'grated Parmesan cheese',
            'quantity': 5,
            'unit': 'g',
            'price': 8
        }, {
            'name': 'seasoned bread crumbs',
            'quantity': 15,
            'unit': 'g',
            'price': 4
        }]
    }, {
        'id': 101,
        'name': 'MD 2',
        'type': 'main dish',
        'image': 'bakedbrie.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ingredient 1',
            'quantity': 1,
            'unit': 'pieces',
            'price': 8
        }, {
            'name': 'ingredient 2',
            'quantity': 15,
            'unit': 'g',
            'price': 7
        }, {
            'name': 'ingredient 3',
            'quantity': 10,
            'unit': 'ml',
            'price': 4
        }]
    }, {
        'id': 102,
        'name': 'MD 3',
        'type': 'main dish',
        'image': 'meatballs.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ingredient 1',
            'quantity': 2,
            'unit': 'pieces',
            'price': 8
        }, {
            'name': 'ingredient 2',
            'quantity': 10,
            'unit': 'g',
            'price': 7
        }, {
            'name': 'ingredient 3',
            'quantity': 5,
            'unit': 'ml',
            'price': 4
        }]
    }, {
        'id': 103,
        'name': 'MD 4',
        'type': 'main dish',
        'image': 'meatballs.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ingredient 1',
            'quantity': 1,
            'unit': 'pieces',
            'price': 4
        }, {
            'name': 'ingredient 2',
            'quantity': 12,
            'unit': 'g',
            'price': 7
        }, {
            'name': 'ingredient 3',
            'quantity': 6,
            'unit': 'ml',
            'price': 4
        }]
    }, {
        'id': 200,
        'name': 'Chocolat Ice cream',
        'type': 'dessert',
        'image': 'icecream.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ice cream',
            'quantity': 100,
            'unit': 'ml',
            'price': 6
        }]
    }, {
        'id': 201,
        'name': 'Vanilla Ice cream',
        'type': 'dessert',
        'image': 'icecream.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ice cream',
            'quantity': 100,
            'unit': 'ml',
            'price': 6
        }]
    }, {
        'id': 202,
        'name': 'Strawberry',
        'type': 'dessert',
        'image': 'icecream.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ice cream',
            'quantity': 100,
            'unit': 'ml',
            'price': 6
        }]
    }
    ];

};
