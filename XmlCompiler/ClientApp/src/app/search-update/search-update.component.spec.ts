import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUpdateComponent } from './search-update.component';

describe('SearchUpdatingChoicesComponent', () => {
  let component: SearchUpdateComponent;
  let fixture: ComponentFixture<SearchUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
