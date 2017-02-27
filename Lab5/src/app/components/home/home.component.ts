/**
 * Created by michel on 2/20/17.
 */

import {Component} from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styles: [require('./home.component.scss')],
})

export class HomeComponent {
    private title = "A Home Dinner Service";
    private description = "Lorem ipsum dolor sit omet Lorem ipsum dolor sit omet Lorem ipsum dolor sit omet Lorem ipsum dolor sitsi tomet Lorem";
}
