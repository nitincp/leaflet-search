import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, forwardRef, HostBinding } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, Validators, FormGroup, FormArray, ControlValueAccessor, SelectMultipleControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { tap, distinctUntilChanged, map } from "rxjs/operators";
import * as g from 'geojson';
import { Subscription } from 'rxjs';

type SearchForm = {
  search: string,
};

type SelectFeaturesForm = {
  features: g.Feature[]
};

export const OSM_SEARCH_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OsmSearchComponent),
  multi: true,
};

@Component({
  selector: 'app-osm-search',
  templateUrl: './osm-search.component.html',
  styleUrls: ['./osm-search.component.scss'],
  providers: [OSM_SEARCH_VALUE_ACCESSOR]
})
export class OsmSearchComponent implements OnInit, OnChanges, ControlValueAccessor {

  value: g.FeatureCollection;
  onChange: (_: any) => void;
  onTouched: () => void;
  selectionChangeSub: Subscription;

  writeValue(obj: g.FeatureCollection): void {
    console.log('write value', obj);
    setTimeout(() => {
      this.value = obj;
      if (this.searchResultFeatureCollection) {
        this.selectFeaturesForm.setControl('features', this.createFeatureFields());
      }
    }, 500);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // no-op
  }

  searchForm: FormGroup;
  selectFeaturesForm: FormGroup;

  searchResultFeatureCollection: g.FeatureCollection;

  @Input()
  search: string;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {

    this.searchForm = this.fb.group({
      search: this.fb.control(null, [Validators.required, Validators.minLength(5)])
    });

    this.searchResultFeatureCollection = null;

    this.selectFeaturesForm = this.fb.group({
      features: this.createFeatureFields()
    });

    this.selectionChangeSub = this.selectFeaturesForm.valueChanges.pipe(
      map((value: SelectFeaturesForm): g.Feature[] => {
        return value.features.filter(feature => feature);
      }),
      distinctUntilChanged(),
      map((selectedFeatures): g.FeatureCollection => {
        if (selectedFeatures.length > 0) {
          return { type: 'FeatureCollection', features: selectedFeatures };
        } else {
          return null;
        }
      }),
      distinctUntilChanged()
    ).subscribe(value => this.onSelectionChange(value));
  }

  private createFeatureFields() {

    if (this.searchResultFeatureCollection) {
      if (this.value) {
        const controls = this.searchResultFeatureCollection.features.map(feature => {
          const isPresent = this.value.features.findIndex(vfeature => vfeature.properties.osm_id === feature.properties.osm_id) > -1;

          if (isPresent === true) {
            return this.fb.control(feature);
          } else {
            return this.fb.control(null);
          }
        });
        return this.fb.array(controls);
      }
      const controls = this.searchResultFeatureCollection.features.map(feature => this.fb.control(null));
      return this.fb.array(controls);
    } else {
      return this.fb.array([]);
    }
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['search'] && changes['search'].firstChange == false) {

      this.searchForm.setValue({ search: this.search });
      this.onSearch({ search: this.search });
    }
  }

  onSearch(searchForm: SearchForm) {

    console.log('search for', searchForm.search);
    this.http.get(`https://nominatim.openstreetmap.org/search?q=${searchForm.search}&limit=5&format=geojson&addressdetails=1&email=nitin.pawar@gmail.com&polygon_geojson=1`).pipe(
      tap((resultFeatureCollection: g.FeatureCollection) => {
        this.searchResultFeatureCollection = resultFeatureCollection;
        this.selectFeaturesForm.setControl('features', this.createFeatureFields());
      })
    ).subscribe();
  }

  onSelectionChange(value: g.FeatureCollection) {

    this.value = value;
    if (this.onChange) this.onChange(value);
    if (this.onTouched) this.onTouched();

    console.log('selected features', value);
  }

  ngOnDestroy() {
    this.selectionChangeSub.unsubscribe();
  }
}
