/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EnteComponent } from './ente.component';

describe('EnteComponent', () => {
  let component: EnteComponent;
  let fixture: ComponentFixture<EnteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
