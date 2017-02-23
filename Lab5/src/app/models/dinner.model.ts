/**
 * Created by michel on 2/21/17.
 */

import {Injectable} from '@angular/core';
import {Recipe, RecipeDetail} from "../components/dish/shared/recipe.model";
import {Observable, Subject} from "rxjs";
import {Http} from "@angular/http";
import {RecipeService} from "../services/RecipeService";

@Injectable()
export class DinnerModel {
    // The menu in the cart
    private menu: RecipeDetail[];
    private menuSubject: Subject<RecipeDetail[]>;

    // The recipes listed in the search view
    private dishes: Recipe[];
    private dishesSubject: Subject<Recipe[]>;

    // Selected recipe
    private recipe: RecipeDetail;
    private recipeSubject: Subject<RecipeDetail>;

    // Initial filter type... sigh
    private filterType = "appetizer";

    constructor(public recipeService: RecipeService) {
        this.menu = [];
        this.menuSubject = new Subject<RecipeDetail[]>();
        this.dishesSubject = new Subject<Recipe[]>();
        this.recipeSubject = new Subject<RecipeDetail>();
    }

    /* Gets the recipes for a specific type and query */
    public searchForDishes(type, query) {
        this.recipeService.getRecipes(type, query).subscribe(dishes => this.setDishes(dishes));
    }

    /* Gets the detail for a recipe with a provided id */
    public getRecipe(id: number) {
        this.recipeService.getRecipeDetails(id).subscribe(dish => this.setSelectedRecipe(dish));
    }

    public setFilterType(val: string) {
        this.filterType = val;
    }

    public getFilterType() {
        return this.filterType;
    }

    /* Adds a recipe to a menu. Filters out already existing recipe of same type */
    public addSelectedDishToMenu() {
        console.log(this.filterType);
        this.menu = this.menu.filter(d => d.type != this.filterType);
        this.menu.push(this.recipe);
        this.menuSubject.next(this.menu);
    }


    public getMenu(): Observable<RecipeDetail[]> {
        return this.menuSubject;
    }

    public getRawMenu() {
        return this.menu;
    }

    public deleteDishOfType(val: string) {
        this.menu = this.menu.filter(d => d.type != val);
        this.menuSubject.next(this.menu);
    }

    /* Get and Set the selected recipe */
    public getSelectedRecipe(): Observable<RecipeDetail> {
        return this.recipeSubject;
    }

    private setSelectedRecipe(recipe: RecipeDetail) {
        this.recipe = recipe;
        this.recipe.type = this.getFilterType();
        this.recipeSubject.next(this.recipe);
    }

    /* Related to the dish list view */
    public getDishes(): Observable<Recipe[]> {
        return this.dishesSubject;
    }

    public setDishes(dishes: any) {
        this.dishes = dishes;
        this.dishesSubject.next(this.dishes);
    }

}
