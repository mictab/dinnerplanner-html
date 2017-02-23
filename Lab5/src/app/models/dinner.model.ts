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

    // Selected recipe price
    private selectedRecipePrice: number;
    private selectedRecipePriceSubject: Subject<number>;

    constructor(private recipeService: RecipeService) {
        this.menuSubject = new Subject<RecipeDetail[]>();
        this.dishesSubject = new Subject<Recipe[]>();
        this.recipeSubject = new Subject<RecipeDetail>();
        this.selectedRecipePriceSubject = new Subject<number>();
    }

    /* Gets the recipes for a specific type and query */
    public searchForDishes(type, query) {
        this.recipeService.getRecipes(type, query).subscribe(dishes => this.setDishes(dishes));
    }

    /* Adds a recipe to a menu. Filters out already existing recipe of same type */
    public addRecipeToMenu(recipe: RecipeDetail) {
        const temp = this.menu.filter(r => r.type != recipe.type);
        temp.push(recipe);
        this.menu = temp;
    }

    public getMenu(): Observable<RecipeDetail[]> {
        return this.menuSubject;
    }

    public getDishes(): Observable<Recipe[]> {
        return this.dishesSubject;
    }

    public getSelectedRecipe(): Observable<RecipeDetail> {
        return this.recipeSubject;
    }

    public getRecipe(id: number): Observable<RecipeDetail> {
        return this.recipeService.getRecipeDetails(id);
    }

    private setSelectedRecipe(recipe: RecipeDetail) {
        this.recipe = recipe;
        this.recipeSubject.next(this.recipe);
        this.selectedRecipePrice = this.recipe.ingredients.reduce((i1, i2) => i1 + i2.price, 0);
        this.selectedRecipePriceSubject.next(this.selectedRecipePrice);
    }

    public getSelectedDishPrice(): Observable<number> {
        return this.selectedRecipePriceSubject;
    }


    public setDishes(dishes: any) {
        this.dishes = dishes;
        this.dishesSubject.next(this.dishes);
    }

    public addDishToMenu(dish: RecipeDetail) {
        this.menu.push(dish);
        this.menuSubject.next(this.menu)
    }

    public removeDishFromMenu(dish: Recipe) {
        this.menu = this.menu.filter(r => r.id != dish.id);
        this.menuSubject.next(this.menu);
    }
}