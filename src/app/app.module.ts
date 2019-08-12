import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ButtonsModule } from "ngx-bootstrap";

import { AppComponent } from './app.component';
import { LeafletGeoHighlightComponent } from './leaflet-geo-highlight/leaflet-geo-highlight.component';
import { OsmSearchComponent } from './osm-search/osm-search.component';


import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-icon-2x.png';

@NgModule({
  declarations: [
    AppComponent,
    LeafletGeoHighlightComponent,
    OsmSearchComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
