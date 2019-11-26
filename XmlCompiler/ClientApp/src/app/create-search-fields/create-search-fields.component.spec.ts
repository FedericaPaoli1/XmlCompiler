import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSearchFieldsComponent } from './create-search-fields.component';

describe('CreateSearchFieldsComponent', () => {
  let component: CreateSearchFieldsComponent;
  let fixture: ComponentFixture<CreateSearchFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSearchFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSearchFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
