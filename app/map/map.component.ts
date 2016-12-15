import {Component, OnInit} from '@angular/core';
import {AgmCoreModule, MapsAPILoader} from 'angular2-google-maps/core';
import {Geolocator} from './geolocation.service';

@Component({
    selector: 'google-map',
    template: `
      <sebm-google-map [latitude]=latitude [longitude]=longitude [zoom]=12>
        <sebm-google-map-marker [latitude]=latitude [longitude]=longitude></sebm-google-map-marker>
      </sebm-google-map>
      `,
    styles: ['.sebm-google-map-container { height: 300px; }'],
    providers: [Geolocator]
})

export class MapComponent implements OnInit {
    latitude: number;
    longitude: number;
    err: string;

    constructor(private mapsAPILoader: MapsAPILoader, private geolocationService: Geolocator) {
    }

    ngOnInit() {
        //formatting! why source.subscribe is tabbed to the right?
        //why do you need source variable here at all?
        let source = this.geolocationService.getLocation({enableHighAccuracy: true, maximumAge: 30000, timeout: 27000});
        source.subscribe(pos => {
            this.latitude = pos.coords.latitude;
            this.longitude = pos.coords.longitude;
        }, err => {
            this.err = err;
            console.log(err);
        });
    }
}
