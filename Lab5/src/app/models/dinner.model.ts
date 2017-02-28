/**
 * Created by michel on 2/21/17.
 */

import {Injectable} from '@angular/core';
import {Recipe, RecipeDetail} from "../components/dish/shared/recipe.model";
import {Observable, Subject} from "rxjs";
import {RecipeService} from "../services/RecipeService";
import {CookieService} from "angular2-cookie/services/cookies.service";

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
    // This sucks
    private filterTypes = ["appetizer", "main course", "dessert"];

    private numberOfPeople;
    private numberOfPeopleSubject: Subject<number>;

    private totalMenuPriceSubject;
    private totalMenuPrice = 0;

    private isLoadingSubject: Subject<boolean>;
    private apiStatusSubject: Subject<boolean>;

    constructor(public recipeService: RecipeService, private _cookieService: CookieService) {
        this.menu = [];
        this.numberOfPeople = 1;
        this.menuSubject = new Subject<RecipeDetail[]>();
        this.dishesSubject = new Subject<Recipe[]>();
        this.recipeSubject = new Subject<RecipeDetail>();
        this.numberOfPeopleSubject = new Subject<number>();
        this.totalMenuPriceSubject = new Subject<number>();
        this.isLoadingSubject = new Subject<boolean>();
        this.apiStatusSubject = new Subject<boolean>();

        if (this._cookieService.getObject("people")) {
            this.setNumberOfPeople(this._cookieService.getObject("people") as number);
        }

        if (this._cookieService.getObject("menu")) {
            let ids = this._cookieService.getObject("menu") as [number];
            this.getRecipesForCookie(ids);
        }
    }

    private getRecipesForCookie(ids: [number]) {
        let count = 0;
        ids.forEach(id => {
            this.recipeService.getRecipeDetails(id).subscribe(dish => {
                this.addCookieDishToMenu(dish, count);
                count++;
            })
        })
    }

    private addCookieDishToMenu(dish: RecipeDetail, count: number) {
        // Uncertainty is awesome
        dish.type = this.filterTypes[count];
        this.menu.push(dish);
        this.menuSubject.next(this.menu);
        this.sortArray();
        this.calculateNewPrice();
    }

    /* Gets the recipes for a specific type and query */
    public searchForDishes(type, query) {
        this.setLoading(true);
        this.setApiSuccess(true);
        this.recipeService.getRecipes(type, query).subscribe(dishes => {
            this.setDishes(dishes);
            this.setLoading(false);
            this.setApiSuccess(true);
        }, (err) => {
            this.setApiSuccess(false)
        });
    }

    /* Gets the detail for a recipe with a provided id */
    public getRecipe(id: number) {
        this.setLoading(true);
        this.setApiSuccess(true);
        this.recipeService.getRecipeDetails(id).subscribe(dish => {
            this.setSelectedRecipe(dish);
            this.setLoading(false);
            this.setApiSuccess(true);
        }, (err) => {
            this.setApiSuccess(false);
        });
    }

    public setFilterType(val: string) {
        this.filterType = val;
    }

    public getFilterType() {
        return this.filterType;
    }

    /* Adds a recipe to a menu. Filters out already existing recipe of same type */
    public addSelectedDishToMenu() {
        this.menu = this.menu.filter(d => d.type != this.filterType);
        this.menu.push(this.recipe);

        // Add to cookies
        this.getRecipeIdsAndAddToCookies();
        this.sortArray();
        this.menuSubject.next(this.menu);
        this.calculateNewPrice();
    }


    public getMenu(): Observable<RecipeDetail[]> {
        return this.menuSubject;
    }

    private getRecipeIdsAndAddToCookies() {
        let ids = [];
        this.menu.forEach(dish => ids.push(dish.id));
        this._cookieService.putObject("menu", ids);
    }

    // Because I'm pedantic
    private sortArray() {
        const typeVals = {"appetizer": 1, "main course": 2, "dessert": 3};
        this.menu.sort((v1, v2) => {
            if (typeVals[v1.type] > typeVals[v2.type]) return 1;
            if (typeVals[v1.type] < typeVals[v2.type]) return -1;
            return 0;
        });
    }

    public getRawMenu() {
        return this.menu;
    }

    public deleteDishOfType(val: string) {
        this.menu = this.menu.filter(d => d.type != val);

        // Cookies nonsense
        this.getRecipeIdsAndAddToCookies();

        this.menuSubject.next(this.menu);
        this.calculateNewPrice();
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

    public setNumberOfPeople(val: number) {
        this.numberOfPeople = val;

        // Add this to a cookie
        //this._cookieService.remove("people");
        this._cookieService.putObject("people", val);

        this.numberOfPeopleSubject.next(this.numberOfPeople);
        this.calculateNewPrice();
    }

    public getNumberOfPeople(): Observable<number> {
        return this.numberOfPeopleSubject;
    }

    public getRawNumPeople() {
        return this.numberOfPeople;
    }

    private calculateNewPrice() {
        let sum = 0;
        this.menu.forEach((item) => sum += item.getPriceForDish(this.numberOfPeople));
        this.totalMenuPrice = sum;
        this.totalMenuPriceSubject.next(this.totalMenuPrice);
    }

    public getRawTotalMenuPrice() {
        return this.totalMenuPrice;
    }

    public getTotalMenuPrice(): Observable<number> {
        return this.totalMenuPriceSubject;
    }

    public isLoading(): Observable<boolean> {
        return this.isLoadingSubject;
    }

    public setLoading(loading) {
        this.isLoadingSubject.next(loading);
    }

    public setApiSuccess(val: boolean) {
        this.apiStatusSubject.next(val);
    }

    public apiStatus(): Observable<boolean> {
        return this.apiStatusSubject;
    }
}
