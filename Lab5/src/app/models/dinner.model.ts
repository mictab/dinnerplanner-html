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
    private menu: RecipeDetail[] = [];
    private menuSubject: Subject<RecipeDetail[]>;

    // The recipes listed in the search view
    private dishes: Recipe[];
    private dishesSubject: Subject<Recipe[]>;

    // Selected recipe
    private recipe: RecipeDetail;
    private recipeSubject: Subject<RecipeDetail>;

    constructor(private recipeService: RecipeService) {
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

    /* Adds a recipe to a menu. Filters out already existing recipe of same type */
    public addSelectedDishToMenu() {
        const temp = this.menu.filter(r => r.type != this.recipe.type);
        temp.push(this.recipe);
        this.menu = temp;
        this.menuSubject.next(this.menu);
    }

    public removeDishFromMenu(type: string) {
        this.menu = this.menu.filter(r => r.type != type);
        this.menuSubject.next(this.menu);
    }

    public getMenu(): Observable<RecipeDetail[]> {
        return this.menuSubject;
    }

    /* Get and Set the selected recipe */
    public getSelectedRecipe(): Observable<RecipeDetail> {
        return this.recipeSubject;
    }

    private setSelectedRecipe(recipe: RecipeDetail) {
        this.recipe = recipe;
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
