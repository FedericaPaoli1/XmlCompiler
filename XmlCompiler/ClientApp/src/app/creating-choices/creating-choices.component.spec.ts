import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingChoicesComponent } from './creating-choices.component';

describe('CreatingChoicesComponent', () => {
  let component: CreatingChoicesComponent;
  let fixture: ComponentFixture<CreatingChoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatingChoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
