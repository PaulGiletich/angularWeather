/// <reference path="../typings/index.d.ts" />

import {Component} from '@angular/core';

@Component({
    selector: 'footer-panel',
    template: `<footer><p>Data flows from openweathermap.org<p></footer>`,
    //why this should be in one line, it is so hard to read
    styles: ['p { color: #666; font-size:0.8em; padding: 10px 0px; text-align:right; font-weight:700;}']
})

export class FooterComponent {}
