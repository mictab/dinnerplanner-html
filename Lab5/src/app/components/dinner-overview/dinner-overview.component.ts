/**
 * Created by michel on 2/21/17.
 */

import {Component} from '@angular/core';
import {Location} from "@angular/common";
import {RecipeDetail} from "../dish/shared/recipe.model";
import {DinnerModel} from "../../models/dinner.model";

@Component({
    selector: 'dinner-overview',
    templateUrl: './dinner-overview.component.html',
    styles: [require('./dinner-overview.component.scss')]
})

export class DinnerOverviewComponent {
    constructor(private location: Location, private model: DinnerModel) {
        this.model.getMenu().subscribe(()=>{
            this.getMenuItems();
        });
        this.model.getNumberOfPeople().subscribe(() => this.getNumPeople());
    }

    goBack() {
        this.location.back();
    }
    getMenuItems(): RecipeDetail[] {
        return this.model.getRawMenu();
    }

    getNumPeople(): number {
        return this.model.getRawNumPeople();
    }

    getMenuPrice(): number {
        return Math.round(this.getMenuItems().reduce((curr, item) => curr + item.price, 0) * 100)/100;
    }
}
