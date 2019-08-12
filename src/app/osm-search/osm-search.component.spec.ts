import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsmSearchComponent } from './osm-search.component';

describe('OsmSearchComponent', () => {
  let component: OsmSearchComponent;
  let fixture: ComponentFixture<OsmSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsmSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsmSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
