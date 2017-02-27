/**
 * Created by michel on 2/21/17.
 */

import {Component} from '@angular/core';
import {DinnerModel} from "../../models/dinner.model";
import {RecipeDetail} from "../dish/shared/recipe.model";
import {Location} from '@angular/common';

@Component({
    selector: 'instructions',
    templateUrl: './instructions.component.html',
    styles: [require('./instructions.component.scss')]
})

export class InstructionsComponent {

    constructor(private location: Location, private model: DinnerModel) {
        this.model.getNumberOfPeople().subscribe(() => this.getNumPeople());
        this.model.getMenu().subscribe(() => this.getMenuItems());
    }

    getNumPeople(): number {
        return this.model.getRawNumPeople();
    }

    getMenuItems(): RecipeDetail[] {
        return this.model.getRawMenu();
    }

    goBack() {
        return this.location.back();
    }
}
