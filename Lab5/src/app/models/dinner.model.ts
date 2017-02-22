/**
 * Created by michel on 2/21/17.
 */

import {Injectable} from '@angular/core';
import {Recipe} from "../components/dish/shared/recipe.model";
import {Observable, Subject} from "rxjs";
import {Http} from "@angular/http";
import {RecipeService} from "../services/RecipeService";

@Injectable()
export class DinnerModel {
    // The menu in the cart
    private menu: Recipe[];
    private menuSubject: Subject<Recipe[]>;

    // The recipes listed in the search view
    private dishes: Recipe[];
    private dishesSubject: Subject<Recipe[]>;

    constructor(private recipeService: RecipeService) {
        this.menuSubject = new Subject<Recipe[]>();
        this.dishesSubject = new Subject<Recipe[]>();
    }

    /* Gets the recipes for a specific type and query */
    public searchForDishes(type, query): Observable<Recipe[]> {
        return this.recipeService.getRecipes(type, query)
    }

    /* Adds a recipe to a menu. Filters out already existing recipe of same type */
    public addRecipeToMenu(recipe: Recipe) {
        const temp = this.menu.filter(r => r.type != recipe.type);
        temp.push(recipe);
        this.menu = temp;
    }

    public getMenu(): Observable<Recipe[]> {
        return this.menuSubject;
    }

    public getDishes(): Observable<Recipe[]> {
        return this.dishesSubject;
    }

    public addDishToMenu(dish: Recipe) {
        this.menu.push(dish);
        this.menuSubject.next(this.menu)
    }

    public removeDishFromMenu(dish: Recipe) {
        const temp = this.menu.filter(r => r.id != dish.id);
        this.menu = temp;
        this.menuSubject.next(this.menu);
    }
}