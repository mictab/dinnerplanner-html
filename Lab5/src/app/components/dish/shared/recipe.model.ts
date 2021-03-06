/**
 * Created by michel on 2/21/17.
 */

import {isUndefined} from "util";
// Can be appetizer, main course or dessert
type DishType = string;

export class Recipe {
    private baseURL = "https://spoonacular.com/recipeImages/";
    id: number;
    name: string;
    image: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.title;
        this.image = `${this.baseURL}${data.image}`;
    }
}

export class RecipeDetail {
    id: number;
    name: string;
    type: DishType;
    image: string;
    servings: number;
    instructions: string;
    ingredients: Ingredient[];
    price: number;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.title;
        this.image = data.image;
        this.instructions = data.instructions;
        this.ingredients = this.formatIngredients(data.extendedIngredients, data.servings);
        this.servings = data.servings;
        this.price = this.ingredients.reduce((r1, r2) => r1 + r2.price, 0);
    }

    private formatIngredients(ingredients: any[], servings: number): any[] {
        if (isUndefined(ingredients)) return [];
        return ingredients.map(ingredient => new Ingredient(ingredient, servings));
    }
}

class Ingredient {
    name: string;
    quantity: number;
    unit: string;
    price: number;

    constructor(data: any, servings: number) {
        this.name = data.name;
        this.quantity = Math.round(data.amount * 100 / servings) / 100;
        this.unit = data.unit;
        this.price = Math.round(data.amount * 100 / servings) / 100;
    }
}
