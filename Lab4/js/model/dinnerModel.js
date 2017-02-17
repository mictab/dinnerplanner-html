'use strict';

const Events = {
    GUESTS_CHANGED: "guests_changed",
    DISH_TYPE_CHANGED: "dish_type_changed",
    SEARCH_CHANGED: "search_changed",
    USER_SELECTED_DISH: "user_selected_dish",
    MENU_CHANGED: "menu_changed",
    DISHES_CHANGED: "dishes_changed",
};

//DinnerModel Object constructor
let DinnerModel = function () {

    this.numberOfGuests = 1;
    this.menu = [];
    this.dinnerTitle = "A Home Dinner Service";
    this.startDescription = "Lorem ipsum dolor sit omet Lorem ipsum dolor sit omet Lorem ipsum dolor sit omet Lorem ipsum dolor sitsi tomet Lorem";
    this.observers = [];
    this.selectedDishType = "appetizer";
    this.selectedDishId = 1;
    this.searchQuery = "";

    // Labb 3
    this.addObserver = function (observer) {
        this.observers.push(observer);
    };

    this.notifyObservers = function (obj) {
        for (let i = 0; i < this.observers.length; i++) {
            this.observers[i].update(obj);
        }
    };

    this.setNumberOfGuests = function (num) {
        if (num > 0) {
            this.numberOfGuests = num;
        }
        this.notifyObservers(Events.GUESTS_CHANGED);
    };

    this.setSearchQuery = function (s) {
        this.searchQuery = s;
        this.notifyObservers(Events.SEARCH_CHANGED)
    };

    this.getSearchQuery = function () {
        return this.searchQuery;
    };

    this.getDishType = function () {
        return this.selectedDishType;
    };

    this.getSelectedDishId = function () {
        return this.selectedDishId;
    };

    this.setDishType = function (type) {
        this.selectedDishType = type;
        this.notifyObservers(Events.DISH_TYPE_CHANGED);
    };

    this.setSelectedDishId = function (id) {
        this.selectedDishId = parseInt(id);
        this.notifyObservers(Events.USER_SELECTED_DISH);
    };

    // should return
    this.getNumberOfGuests = function () {
        return this.numberOfGuests;
    };

    //Returns the dish that is on the menu for selected type
    this.getSelectedDish = function (type) {
        for (let i = 0; i < this.menu.length; i++) {
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
        let totalDishPrice = 0;
        for (let i = 0; i < dishes.length; i++) {
            if (dishes[i].id === id) {
                for (let j = 0; j < dishes[i].ingredients.length; j++) {
                    totalDishPrice += dishes[i].ingredients[j].price;
                }
            }

        }
        return totalDishPrice;
    };

    //Returns all ingredients for all the dishes on the menu.
    this.getAllIngredients = function () {
        let ingredients = [];
        for (let i = 0; i < this.menu.length; i++) {
            for (let j = 0; j < this.menu[i].ingredients; j++) {
                ingredients.push(this.menu[i].ingredients[j]);
            }
        }
        return ingredients;
    };

    //Returns the total price of the menu (all the ingredients multiplied by number of guests).
    this.getTotalMenuPrice = function () {
        let sum = 0;
        for (let i = 0; i < this.menu.length; i++) {
            for (let j = 0; j < this.menu[i].ingredients.length; j++) {
                sum += this.menu[i].ingredients[j].price;
            }
        }
        return sum * this.numberOfGuests;
    };

    //Adds the passed dish to the menu. If the dish of that type already exists on the menu
    //it is removed from the menu and the new one added.
    this.addDishToMenu = function (id) {
        let type;
        let dish;
        for (let i = 0; i < dishes.length; i++) {
            if (dishes[i].id == id) {
                type = dishes[i].type;
                dish = dishes[i];
                break;
            }
        }

        for (let j = 0; j < this.menu.length; j++) {
            if (this.menu[j].type === type) {
                this.menu.splice(j, 1);
            }
        }

        this.menu.push(dish);
        this.notifyObservers(Events.MENU_CHANGED);
    };

    //Removes dish from menu
    this.removeDishFromMenu = function (id) {
        for (let i = 0; i < this.menu.length; i++) {
            if (this.menu[i].id === id) {
                this.menu.splice(i, 1);
            }
        }
        this.notifyObservers(Events.MENU_CHANGED);
    };

    this.cartIsEmpty = function () {
        return this.menu.length == 0;
    };
    

    this.createRecipeFromData = function (obj) {
        const id = obj.id;
        const title = obj.title;
        return {'id': id, 'name': title};
    };

    this.fetchAPIDishes = function () {
        const url = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?type=${this.getDishType()}&query=${this.getSearchQuery()}`;
        const headers = new Headers();
        headers.append('X-Mashape-Key', 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB');
        let tempRecipes = [];

        let fetchInit = {
            headers: headers,
            method: 'GET',
            cache: 'default'
        };

        fetch(url, fetchInit)
            .then(response => response.json())
            .then(json => {
                tempRecipes = json.results.map(recipe => this.createRecipeFromData(recipe));
                dishes = tempRecipes;
                this.notifyObservers(Events.DISHES_CHANGED);
            })
            .catch(error => {
                console.log(error);
            });
    };

    this.getDishes = function () {
        return dishes;
    };

    //function that returns a dish of specific ID
    this.getDish = function (id) {
        for (let key in dishes) {
            if (dishes[key].id == id) {
                return dishes[key];
            }
        }
    };

    this.setRecipes = function (recipes) {
        dishes = recipes;
    };


    // the dishes variable contains an array of all the
    // dishes in the database. each dish has id, name, type,
    // image (name of the image file), description and
    // array of ingredients. Each ingredient has name,
    // quantity (a number), price (a number) and unit (string
    // defining the unit i.e. "g", "slices", "ml". Unit
    // can sometimes be empty like in the example of eggs where
    // you just say "5 eggs" and not "5 pieces of eggs" or anything else.
    let dishes = [];

};
