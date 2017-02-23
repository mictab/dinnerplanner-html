/**
 * Created by michel on 2/21/17.
 */

import {Component} from '@angular/core';
import {Location} from "@angular/common";

@Component({
    selector: 'dinner-overview',
    templateUrl: './dinner-overview.component.html',
    styles: [require('./dinner-overview.component.scss')]
})

export class DinnerOverviewComponent {

    constructor(private location: Location) {}

    goBack() {
        this.location.back();
    }
}
