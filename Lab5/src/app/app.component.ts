import {Component} from '@angular/core';
import {DinnerModel} from "./models/dinner.model";
import {RecipeService} from "./services/RecipeService";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private dinnerModel: DinnerModel, private recipeService: RecipeService) {}
}
