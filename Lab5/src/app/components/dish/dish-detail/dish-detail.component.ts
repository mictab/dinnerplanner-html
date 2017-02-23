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
        this.dinnerModel.getRecipe(id).subscribe(dish => this.onDishReceived(dish));
        this.dinnerModel.getSelectedDishPrice().subscribe(price => this.recipePrice = price);
    }

    private onDishReceived(recipe: RecipeDetail) {
        this.recipe = recipe;
    }

    backClicked() {
        this._location.back();
    }
}
