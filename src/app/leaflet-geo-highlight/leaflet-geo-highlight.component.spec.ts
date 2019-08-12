import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletGeoHighlightComponent } from './leaflet-geo-highlight.component';

describe('LeafletGeoHighlightComponent', () => {
  let component: LeafletGeoHighlightComponent;
  let fixture: ComponentFixture<LeafletGeoHighlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafletGeoHighlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafletGeoHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
