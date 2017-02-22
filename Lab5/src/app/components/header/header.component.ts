/**
 * Created by michel on 2/20/17.
 */

import {Component} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: [require('./header.component.scss')]
})

export class HeaderComponent {
    private headerTitle = "Homelette".toUpperCase();
    private headerSubtitle = "From the best chefs in the world directly into your kitchen";
}