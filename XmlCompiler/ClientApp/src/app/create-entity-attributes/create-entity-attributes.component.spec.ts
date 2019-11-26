import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntityAttributesComponent } from './create-entity-attributes.component';

describe('CreateEntityAttributesComponent', () => {
  let component: CreateEntityAttributesComponent;
  let fixture: ComponentFixture<CreateEntityAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEntityAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEntityAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
