import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from "leaflet";
import * as g from 'geojson';

@Component({
  selector: 'app-leaflet-features-highlight',
  templateUrl: './leaflet-features-highlight.component.html',
  styleUrls: ['./leaflet-features-highlight.component.scss']
})
export class LeafletFeaturesHighlightComponent implements OnInit, OnChanges {

  @Input()
  featureCollection: g.FeatureCollection;

  options: L.MapOptions = {
    layers: [
      L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 2,
    maxZoom: 18,
    minZoom: 2,
    center: L.latLng(0, 0)
  };
  map: L.Map;
  geoJSONLayer: L.GeoJSON<g.Point | g.Polygon>;;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['featureCollection'] && changes['featureCollection'].firstChange == false) {

      if (this.geoJSONLayer) {
        this.geoJSONLayer.remove();
        this.geoJSONLayer = null;
      }

      if (this.featureCollection && this.featureCollection.features.length > 0) {
        this.geoJSONLayer = L.geoJSON(this.featureCollection, {
          // pointToLayer: (geoJSONPoint, latlng) => L.marker(latlng, {
          //   icon: L.divIcon({
          //     html: '1200',
          //     className: 'divIcon'
          //   })
          // })
        });

        const geoJSONBounds = this.geoJSONLayer.getBounds();
        this.geoJSONLayer.addTo(this.map);
        this.map.fitBounds(geoJSONBounds);
      } else {
        this.map.setView(this.map.options.center, this.map.options.zoom);
      }
    }
  }

  onMapReady($event: L.Map) {
    console.log('map ready', $event);
    this.map = $event;
  }
}
