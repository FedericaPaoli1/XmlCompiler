import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSearchAttributesComponent } from './create-search-attributes.component';

describe('CreateSearchAttributesComponent', () => {
  let component: CreateSearchAttributesComponent;
  let fixture: ComponentFixture<CreateSearchAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSearchAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSearchAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
