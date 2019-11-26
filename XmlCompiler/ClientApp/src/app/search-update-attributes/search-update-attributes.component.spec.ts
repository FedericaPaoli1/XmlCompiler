import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUpdateAttributesComponent } from './search-update-attributes.component';

describe('SearchUpdateComponent', () => {
  let component: SearchUpdateAttributesComponent;
  let fixture: ComponentFixture<SearchUpdateAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUpdateAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUpdateAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
