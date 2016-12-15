/// <reference path="../typings/index.d.ts" />

import {Component} from '@angular/core';

@Component({
    selector: 'header-panel',
    template: `<h1>Here's how the weather for your location looks like (50 cities and towns around you)</h1>`,
    // T_T
    styles: ['h1 { font-family: Georgia, "Times New Roman", Times, serif; font-size: 2em; margin-top: 20px; margin-bottom: 20px; text-align: center; font-weight: normal;color: #222; }']
})

export class HeaderComponent {}
