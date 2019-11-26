import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntityFieldsComponent } from './create-entity-fields.component';

describe('CreateEntityFieldsComponent', () => {
  let component: CreateEntityFieldsComponent;
  let fixture: ComponentFixture<CreateEntityFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEntityFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEntityFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
