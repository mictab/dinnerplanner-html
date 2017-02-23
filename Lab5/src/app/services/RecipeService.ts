/**
 * Created by michel on 2/21/17.
 */

import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from "rxjs";
import {Recipe, RecipeDetail} from "../components/dish/shared/recipe.model";
import {log} from "util";

@Injectable()
export class RecipeService {
    private BASE_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/';
    private API_KEY = 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB';
    private headers;
    private endpoints = {
        search: 'search?number=16',
    };

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('X-Mashape-Key', this.API_KEY);
    }

    getRecipes(type: string, query: string): Observable<any> {
        return this.http.get(`${this.BASE_URL}${this.endpoints.search}&type=${type}&query=${query}`,
            {headers: this.headers}).map(RecipeService.extractRecipes);
    }

    getRecipeDetails(id: number): Observable<any> {
        return this.http.get(`${this.BASE_URL}${id}/information`, {headers: this.headers}).map(RecipeService.extractRecipeDetail);
    }

    private static handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    private static extractRecipes(response: any): any {
        return response.json().results.map(recipe => new Recipe(recipe));
    }

    private static extractRecipeDetail(response: any): any {
        return new RecipeDetail(response.json());
    }
}