import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnInit,
    OnChanges,
    AfterContentInit
} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {FormsModule}   from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import {Geolocator} from '../map/geolocation.service';

import {MeteoData} from './meteo-data';
import {TempConversionPipe} from './utilities/temp-conversion.pipe';
import {WindDirectionPipe} from './utilities/wind-direction.pipe';
import {SearchPipe} from './utilities/search.pipe';

@Component({
    selector: 'meteo-cities',
    templateUrl: 'app/meteo/meteo-cities.component.html',
    styleUrls: ['app/meteo/meteo-cities.component.css'],
    providers: [Geolocator, TempConversionPipe, WindDirectionPipe, SearchPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MeteoCitiesComponent implements OnInit {
    errorMessage: string;

    //as i see, citiesData type is different from forecast data type. these are two distinct types
    citiesData: MeteoData[];
    forecast: MeteoData[];

    public isInFavorites: boolean = false;

    private _units = 'metric';
    private _APPID = '47bc4e43962dbb173c1a3a7b2d5d0aa9';

    constructor(private http: Http, private geolocationService: Geolocator, private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.getMeteo()
            .subscribe(
                data => this.citiesData = data,
                error => this.errorMessage = <any>error
            );// if brace opening starts a new line, brace closing should be on a new line as well (syntax comment)
    }

    getMeteo() {
        //WAT? srsly, 337 columns line? (syntax comment)
        return this.geolocationService
            .getLocation({enableHighAccuracy: true, maximumAge: 30000, timeout: 27000})
            //there is a nice way to pass http params in angular 2. please, do not concatenate strings by yourself
            .flatMap(pos => this.http.get('http://api.openweathermap.org/data/2.5/find' +
                '?lat='
                + pos.coords.latitude
                + '&lon='
                + pos.coords.longitude
                + '&cnt=50&units='
                + this._units
                + '&APPID='
                + this._APPID))
            .map((res: Response) => {
                setInterval(() => {
                    // favorites are cleared every 15 seconds because of this
                    this.cd.markForCheck();
                    // do you really need to store citiesData as a field in component?
                    // it is not used anywhere
                    this.citiesData = res.json().list;
                    this.forecast = displayWeatherData(this.citiesData);
                }, 15000);
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}

//why is this exported?
export function displayWeatherData(result: MeteoData[]) {
    //you can use Array.prototype.map here
    let forecast = [];
    result.forEach((item) => {
        forecast.push({
            name: item.name,
            temp: item.main.temp,
            humidity: item.main.humidity,
            wind: item.wind.speed,
            winddir: item.wind.deg,
            pressure: item.main.pressure,
            clouds: item.clouds.all,
            description: item.weather[0].description,
            weather: item.weather[0].main
        })
    });
    return forecast;
}
