import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as g from 'geojson';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

type CityInfo = {
  "country": string;
  "geonameid": number;
  "name": string;
  "subcountry": string;
  saved: boolean
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

  osmSearch: g.FeatureCollection;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {

    this.http.get<CityInfo[]>('./assets/world-cities.json').subscribe(worldCities => {
 
      this.worldCities = worldCities.slice(0, 100);
      for (let idx = 0; idx < this.worldCities.length; idx++) {
        const city = this.worldCities[idx];
        const citySearchText = getSearchText(city);

        const savedData = localStorage.getItem(citySearchText);

        if (savedData) {
          city.saved = true;
        } else {
          city.saved = false;
        }
      }
    });

    this.selectCityForm = this.fb.group({
      selectedCity: this.fb.control(null, Validators.required)
    });

    this.selectCityForm.valueChanges.subscribe((selectCityForm: SelectCityForm) => {
      this.onSearchCity(selectCityForm.selectedCity);
    });
  }

  onFeaturesSelected(features: g.FeatureCollection) {

    this.selectedFeatures = features;
  }

  onSave() {

    localStorage.setItem(this.search, JSON.stringify(this.osmSearch));
    (this.selectCityForm.value as SelectCityForm).selectedCity.saved = true;
  }

  onRemove() {
    localStorage.removeItem(this.search);
    (this.selectCityForm.value as SelectCityForm).selectedCity.saved = false;
  }

  onSearchCity(city: CityInfo) {

    this.search = getSearchText(city);
    const savedData = localStorage.getItem(this.search);
    if (savedData) {
      this.osmSearch = JSON.parse(savedData);
    } else {
      this.osmSearch = null;
    }
  }
}
function getSearchText(city: CityInfo): string {
  return `${city.name}, ${city.subcountry}, ${city.country}`;
}

