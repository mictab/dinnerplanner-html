/**
 * Created by michel on 2/21/17.
 */

export class Recipe {
    id: number;
    name: string;
    type: string;
    image: string;
    description: string;
    ingredients: Array<Ingredient>;
}

class Ingredient {
    name: string;
    quantity: number;
    unit: string;
    price: number;
}

