/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ArbitroComponent } from './arbitro.component';

describe('ArbitroComponent', () => {
  let component: ArbitroComponent;
  let fixture: ComponentFixture<ArbitroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbitroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbitroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
