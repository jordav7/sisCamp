/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CampeonatoEditComponent } from './campeonato-edit.component';

describe('CampeonatoEditComponent', () => {
  let component: CampeonatoEditComponent;
  let fixture: ComponentFixture<CampeonatoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampeonatoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampeonatoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
