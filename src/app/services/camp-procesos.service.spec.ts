/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CampProcesosService } from './camp-procesos.service';

describe('CampProcesosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampProcesosService]
    });
  });

  it('should ...', inject([CampProcesosService], (service: CampProcesosService) => {
    expect(service).toBeTruthy();
  }));
});
