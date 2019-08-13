import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletFeaturesHighlightComponent } from './leaflet-features-highlight.component';

describe('LeafletFeaturesHighlightComponent', () => {
  let component: LeafletFeaturesHighlightComponent;
  let fixture: ComponentFixture<LeafletFeaturesHighlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafletFeaturesHighlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafletFeaturesHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
