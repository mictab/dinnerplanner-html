/**
 * Created by michel on 2/21/17.
 */
import {Component} from "@angular/core";
import {Recipe} from "../shared/recipe.model";
import {DinnerModel} from "../../../models/dinner.model";

@Component({
    selector: 'dish-list',
    styles: [require('./dish-list.component.scss')],
    templateUrl: './dish-list.component.html'
})

export class DishListComponent {
    private recipes: Recipe[];
    private sub: any = null;

    constructor(public model: DinnerModel) {
        this.model.searchForDishes("appetizer", "");
    }

    ngOnInit() {
        // Subscribe to the available dishes
        this.sub = this.model.getDishes().subscribe(dishes => this.onDishesReceived(dishes));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private onDishesReceived(dishes: Recipe[]) {
        this.recipes = dishes;
    }

    searchForDishes(type: string, query: string) {
        this.model.searchForDishes(type, query);
    }

    setDishType(val: string) {
        this.model.setFilterType(val);
    }

}
