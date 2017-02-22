/**
 * Created by michel on 2/21/17.
 */

import {Component, Input} from '@angular/core';
import {Recipe} from "../shared/recipe.model";
import {DinnerModel} from "../../../models/dinner.model";
import {Observable} from "rxjs";

@Component({
    selector: 'dish-list',
    styles: [require('./dish-list.component.scss')],
    templateUrl: './dish-list.component.html'
})

export class DishListComponent {
    private recipes: Recipe[];

    constructor(private model: DinnerModel) {
        this.model.searchForDishes("starter", "").subscribe(recipes => this.onDishesReceived(recipes));
    }

    private onDishesReceived(dishes: Recipe[]) {
        this.recipes = dishes;
    }

    searchForDishes(type: string, query: string) {
        this.model.searchForDishes(type, query).subscribe(recipes => this.onDishesReceived(recipes));
    }
}