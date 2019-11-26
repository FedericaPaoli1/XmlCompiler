import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityUpdateFieldsComponent } from './entity-update-fields.component';

describe('EntityUpdateFieldsComponent', () => {
  let component: EntityUpdateFieldsComponent;
  let fixture: ComponentFixture<EntityUpdateFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityUpdateFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityUpdateFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
