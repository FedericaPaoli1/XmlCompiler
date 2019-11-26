import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUpdateFieldsComponent } from './search-update-fields.component';

describe('SearchUpdateFieldsComponent', () => {
  let component: SearchUpdateFieldsComponent;
  let fixture: ComponentFixture<SearchUpdateFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUpdateFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUpdateFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
