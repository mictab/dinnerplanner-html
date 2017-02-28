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

    constructor(public model: DinnerModel) {
        this.model.getMenu().subscribe(() => this.getMenuItems());
        this.model.getNumberOfPeople().subscribe(() => this.getNumPeople());
        this.model.getTotalMenuPrice().subscribe(() => this.getMenuPrice());
    }

    getMenuItems(): RecipeDetail[] {
        return this.model.getRawMenu();
    }

    deleteDishFor(type: string) {
        this.model.deleteDishOfType(type);
    }

    setNumberOfPeople(event: any) {
        this.model.setNumberOfPeople(event.target.value);
    }

    getNumPeople(): number {
        return this.model.getRawNumPeople();
    }

    getMenuPrice(): number {
        return this.model.getRawTotalMenuPrice();
    }

    getPriceForDish(item: RecipeDetail, num: number) {
        return Math.round(item.ingredients.reduce((curr, item) => curr + item.price, 0) * num * 100) / 100;
    }

}
