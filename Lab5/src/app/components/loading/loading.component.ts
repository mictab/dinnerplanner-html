/**
 * Created by Aiman on 27/02/17.
 */
import {Component} from '@angular/core';
import {DinnerModel} from "../../models/dinner.model";

@Component({
    selector: 'loading-bar',
    templateUrl: './loading.component.html',
    styles: [require('./loading.component.scss')]
})
export class LoadingComponent{
    private isLoading = false;
    private success = true;

    constructor(private model: DinnerModel){
        this.model.isLoading().subscribe(b => this.isLoading = b);

        this.model.apiStatus().subscribe(b => this.success = b);
    }
}
