/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ArbitroEditComponent } from './arbitro-edit.component';

describe('ArbitroEditComponent', () => {
  let component: ArbitroEditComponent;
  let fixture: ComponentFixture<ArbitroEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbitroEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbitroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
