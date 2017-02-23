/**
 * Created by michel on 2/21/17.
 */
import {Component} from '@angular/core';
import {Recipe, RecipeDetail} from "../shared/recipe.model";
import {DinnerModel} from "../../../models/dinner.model";
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';

@Component({
    selector: 'dish-detail',
    templateUrl: './dish-detail.component.html',
    styles: [require('./dish-detail.component.scss')]
})

export class DishDetailComponent {
    private recipe: RecipeDetail;
    private recipePrice: number;

    constructor(private dinnerModel: DinnerModel, private route: ActivatedRoute, private _location: Location) { }

    ngOnInit() {
        let id = +this.route.snapshot.params['id'];
        this.dinnerModel
            .getSelectedRecipe()
            .subscribe(dish => this.onDishReceived(dish));
        this.dinnerModel.getRecipe(id);
    }

    private onDishReceived(recipe: RecipeDetail) {
        this.recipe = recipe;
        this.calculateDishPrice();
    }

    backClicked() {
        this._location.back();
    }

    addSelectedDishToMenu() {
        this.dinnerModel.addSelectedDishToMenu();
    }

    private calculateDishPrice() {
        this.recipePrice = this.recipe.ingredients.reduce((i1, i2) => i1 + i2.price, 0)
    }
}
