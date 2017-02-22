/**
 * Created by michel on 2/21/17.
 */

import {Injectable} from '@angular/core';
import {Recipe} from "../components/dish/shared/recipe.model";
import {Observable} from "rxjs";

@Injectable()
export class DinnerModel {
    private menu: Array<Recipe>;

    public addRecipeToMenu(recipe: Recipe): void {
        const temp = this.menu.filter(r => r.type != recipe.type);
        temp.push(recipe);
        this.menu = temp;
    }

    public getRecipesInMenu(): Observable<Recipe[]> {
        return Observable.of(this.menu);
    }
}