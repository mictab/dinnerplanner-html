/**
 * Created by michel on 2/21/17.
 */
import {Component} from '@angular/core';
import {RecipeDetail} from "../dish/shared/recipe.model";
import {DinnerModel} from "../../models/dinner.model";

@Component({
    selector: 'checkout',
    templateUrl: './checkout.component.html',
    styles: [require('./checkout.component.scss')]
})

export class CheckoutComponent {
    private menu: RecipeDetail[];
    private totalPrice = 10;
    private numberOfGuests = 1;

    constructor(public dinnerModel: DinnerModel) {
        this.dinnerModel.getMenu().subscribe(menu => {
            this.menu = menu
        })
    }
}
