/**
 * Created by michel on 2/21/17.
 */
import {Component} from '@angular/core';
import {Recipe} from "../dish/shared/recipe.model";
import {DinnerModel} from "../../models/dinner.model";

@Component({
    selector: 'checkout',
    templateUrl: './checkout.component.html',
    styles: [require('./checkout.component.scss')]
})

export class CheckoutComponent {
    private menu: Recipe[];
    private sub: any = null;
    private totalPrice = 10;
    private numberOfGuests = 33;
    private cartHasItems = true;
    private cart = ["A", "B", "C", "D"];

    constructor(private dinnerModel: DinnerModel) {
    }

    ngOnInit() {
        this.sub = this.dinnerModel.getRecipesInMenu().subscribe((menu) => this.menu = menu);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}