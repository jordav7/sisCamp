/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JugadorEditComponent } from './jugador-edit.component';

describe('JugadorEditComponent', () => {
  let component: JugadorEditComponent;
  let fixture: ComponentFixture<JugadorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JugadorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
