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

    constructor(public dinnerModel: DinnerModel) {
        this.dinnerModel.getMenu().subscribe(() => this.getMenuItems());
        this.dinnerModel.getNumberOfPeople().subscribe(() => this.getNumPeople());
        this.dinnerModel.getTotalMenuPrice().subscribe(() => this.getMenuPrice());
    }

    getMenuItems(): RecipeDetail[] {
        return this.dinnerModel.getRawMenu();
    }

    deleteDishFor(type: string) {
        this.dinnerModel.deleteDishOfType(type);
    }

    setNumberOfPeople(event: any) {
        this.dinnerModel.setNumberOfPeople(event.target.value);
    }

    getNumPeople(): number {
        return this.dinnerModel.getRawNumPeople();
    }

    getMenuPrice(): number {
        return this.dinnerModel.getRawTotalMenuPrice();
    }

}
