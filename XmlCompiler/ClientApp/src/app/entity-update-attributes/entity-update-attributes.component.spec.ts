import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityUpdateAttributesComponent } from './entity-update-attributes.component';

describe('EntityUpdateAttributesComponent', () => {
  let component: EntityUpdateAttributesComponent;
  let fixture: ComponentFixture<EntityUpdateAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityUpdateAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityUpdateAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
