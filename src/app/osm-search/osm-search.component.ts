import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { tap } from "rxjs/operators";
import * as g from 'geojson';

type SearchForm = {
  search: string,
};

type SelectFeaturesForm = {
  features: g.Feature[]
};

const EMPTY_RESULT: g.FeatureCollection = {
  type: "FeatureCollection",
  features: []
};
@Component({
  selector: 'app-osm-search',
  templateUrl: './osm-search.component.html',
  styleUrls: ['./osm-search.component.scss']
})
export class OsmSearchComponent implements OnInit, OnChanges {

  searchForm: FormGroup;
  selectFeaturesForm: FormGroup;

  resultFeatures: g.FeatureCollection;

  @Input()
  search: string;

  @Output()
  featuresSelected = new EventEmitter<g.FeatureCollection>();
  
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {

    this.searchForm = this.fb.group({
      search: this.fb.control(null, [Validators.required, Validators.minLength(5)])
    });

    this.resultFeatures = EMPTY_RESULT;

    this.selectFeaturesForm = this.fb.group({
      features:  this.createFeatureFields()
    });

    this.selectFeaturesForm.valueChanges
      .subscribe(value => this.onSelectionChange(value));
  }

  private createFeatureFields(): any {
    return this.fb.array(this.resultFeatures.features.map(feature => this.fb.control(null)));
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['search'] && changes['search'].firstChange == false) {

      this.searchForm.setValue({ search: this.search });
      this.resultFeatures = EMPTY_RESULT;
      this.selectFeaturesForm.setControl('features', this.createFeatureFields());
      this.onSearch({ search: this.search });
    }
  }

  onSearch(searchForm: SearchForm) {

    console.log('search for', searchForm.search);
    this.http.get(`https://nominatim.openstreetmap.org/search?q=${searchForm.search}&limit=5&format=geojson&addressdetails=1&email=nitin.pawar@gmail.com&polygon_geojson=1`).pipe(
      tap((resultFeatureCollection: g.FeatureCollection<g.Point>) => {
        this.resultFeatures = resultFeatureCollection;
        this.selectFeaturesForm.setControl('features', this.createFeatureFields());
      })
    ).subscribe();
  }

  onSelectionChange(value: SelectFeaturesForm) {

    const selectedFeatures = value.features.filter(feature => feature);
    this.featuresSelected.emit( { type: "FeatureCollection", features: selectedFeatures });
    console.log('selected features', selectedFeatures);
  }
}
