import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as g from 'geojson';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { zoomableCirclePacking } from './zoomable-circle-packing';

console.log('zoomable circle packing', zoomableCirclePacking);

type CityInfo = {
  "country": string;
  "geonameid": number;
  "name": string;
  "subcountry": string;
};

type SelectCityForm = {
  selectedCity: CityInfo;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'leaflet-search';
  selectedFeatures: g.FeatureCollection;
  worldCities: CityInfo[];
  search: string;
  selectCityForm: FormGroup;

  @ViewChild('d3container')
  d3container: ElementRef<HTMLDivElement>;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {

    this.http.get<any>('./assets/world-cities.json').subscribe(worldCities => {

      this.worldCities = worldCities;
    });

    this.selectCityForm = this.fb.group({
      selectedCity: this.fb.control(null, Validators.required)
    });

    this.selectCityForm.valueChanges.subscribe((selectCityForm: SelectCityForm) => {
      this.onSearchCity(selectCityForm.selectedCity);
    });

    const mysvg = zoomableCirclePacking();
    console.log('mysvg', mysvg);
    this.d3container.nativeElement.appendChild(mysvg);
  }

  onFeaturesSelected(features: g.FeatureCollection) {

    this.selectedFeatures = features;
  }

  onSearchCity(city: CityInfo) {
    this.search = `${city.name}, ${city.subcountry}, ${city.country}`;
  }
}
