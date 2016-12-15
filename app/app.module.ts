import {NgModule}      from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';

import {AgmCoreModule, MapsAPILoader} from 'angular2-google-maps/core';

import {AppComponent}  from './app.component';
import {HeaderComponent} from "./header.component";
import {FooterComponent} from "./footer.component";

import {MeteoCitiesComponent} from "./meteo/meteo-cities.component";
import {TempConversionPipe} from './meteo/utilities/temp-conversion.pipe';
import {WindDirectionPipe} from './meteo/utilities/wind-direction.pipe';
import {SearchPipe} from './meteo/utilities/search.pipe';

import {MapComponent} from "./map/map.component";
import {Geolocator} from './map/geolocation.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAqihyZkP0kxB44SW-O6WBQI6b-syJyt2Y', libraries: ["places"]
        })
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MapComponent,
        MeteoCitiesComponent,
        TempConversionPipe,
        WindDirectionPipe,
        SearchPipe
    ],
    bootstrap: [AppComponent],
    providers: [Geolocator]
})

export class AppModule {
}
