import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ButtonsModule } from "ngx-bootstrap";

import { AppComponent } from './app.component';
import { LeafletFeaturesHighlightComponent } from './leaflet-features-highlight/leaflet-features-highlight.component';
import { OsmSearchComponent } from './osm-search/osm-search.component';

import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-icon-2x.png';

@NgModule({
  declarations: [
    AppComponent,
    LeafletFeaturesHighlightComponent,
    OsmSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
