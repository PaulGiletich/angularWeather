/// <reference path="../typings/index.d.ts" />

import {Component} from '@angular/core';

@Component({
    selector: 'weather-app',
    template: `
        <header-panel></header-panel>
        <meteo-cities></meteo-cities>
        <google-map></google-map>
        <footer-panel></footer-panel>
    `,
    //every time i need to use a horisontal scroll while reading a code, i die inside
    styles: [`
        :host { 
        font-family: helvetica,arial,sans-serif; 
        box-sizing: border-box; 
        background: #f7f6f5; 
        padding: 5px; 
        display:block;
    }`]
})

export class AppComponent {
}
