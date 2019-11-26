import { TestBed, inject } from '@angular/core/testing';

import { PageSubsService } from './page-subs.service';

describe('PageSubsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageSubsService]
    });
  });

  it('should be created', inject([PageSubsService], (service: PageSubsService) => {
    expect(service).toBeTruthy();
  }));
});
