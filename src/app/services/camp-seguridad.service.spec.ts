/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CampSeguridadService } from './camp-seguridad.service';

describe('CampSeguridadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampSeguridadService]
    });
  });

  it('should ...', inject([CampSeguridadService], (service: CampSeguridadService) => {
    expect(service).toBeTruthy();
  }));
});
