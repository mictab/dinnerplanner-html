import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {HeaderComponent} from "./components/header/header.component";
import {HomeComponent} from "./components/home/home.component";
import {DishListComponent} from "./components/dish/dish-list/dish-list.component";
import {RecipeService} from "./services/RecipeService";
import {FormsModule} from "@angular/forms";
import {DinnerModel} from "./models/dinner.model";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {DishDetailComponent} from "./components/dish/dish-detail/dish-detail.component";
import {InstructionsComponent} from "./components/instructions/instructions.component";
import {DinnerOverviewComponent} from "./components/dinner-overview/dinner-overview.component";
import {LoadingComponent} from "./components/loading/loading.component";
import {CookieService} from "angular2-cookie/services/cookies.service";

@NgModule({
    declarations: [
        AppComponent,
        LoadingComponent,
        HeaderComponent,
        HomeComponent,
        CheckoutComponent,
        DishListComponent,
        DishDetailComponent,
        InstructionsComponent,
        DinnerOverviewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(rootRouterConfig, {useHash: true})
    ],
    providers: [RecipeService, DinnerModel, CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
