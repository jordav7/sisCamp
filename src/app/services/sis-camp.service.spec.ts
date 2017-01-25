/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SisCampService } from './sis-camp.service';

describe('SisCampService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SisCampService]
    });
  });

  it('should ...', inject([SisCampService], (service: SisCampService) => {
    expect(service).toBeTruthy();
  }));
});
