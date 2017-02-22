/**
 * Created by michel on 2/21/17.
 */

// Can be appetizer, main course or dessert
import {isUndefined} from "util";
type DishType = string;

export class Recipe {
    private baseURL = "https://spoonacular.com/recipeImages/";
    id: number;
    name: string;
    type: DishType;
    image: string;
    instructions: string;
    ingredients: Ingredient[];
    servings: number;
    price: number;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.title;
        this.type = "appetizer"; // For now
        this.image = `${this.baseURL}${data.image}`;
        this.instructions = data.instructions;
        this.ingredients = Recipe.formatIngredients(data.extendedIngredients);
        this.servings = data.servings;
        this.price = this.ingredients.reduce((r1, r2) => r1 + r2.price, 0);
    }

    private static formatIngredients(ingredients: any[]): any[] {
        if (isUndefined(ingredients)) return [];
        return ingredients.map(ingredient => new Ingredient(ingredient));
    }
}

class Ingredient {
    name: string;
    quantity: number;
    unit: string;
    price: number;

    constructor(data: any) {
        this.name = data.name;
        this.quantity = data.amount;
        this.unit = data.unit;
        this.price = data.unit;
    }
}

