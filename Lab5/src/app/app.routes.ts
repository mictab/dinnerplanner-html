import {Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {DishListComponent} from "./components/dish/dish-list/dish-list.component";
import {DishDetailComponent} from "./components/dish/dish-detail/dish-detail.component";

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'list', component: DishListComponent },
  { path: 'detail', component: DishDetailComponent },
  { path : '**', redirectTo: 'home' }
];
