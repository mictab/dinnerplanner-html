import {Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {DishListComponent} from "./components/dish/dish-list/dish-list.component";
import {DishDetailComponent} from "./components/dish/dish-detail/dish-detail.component";
import {InstructionsComponent} from "./components/instructions/instructions.component";
import {DinnerOverviewComponent} from "./components/dinner-overview/dinner-overview.component";

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'list', component: DishListComponent },
  { path: 'detail/:id', component: DishDetailComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'overview', component: DinnerOverviewComponent },
  { path : '**', redirectTo: 'home' }
];
