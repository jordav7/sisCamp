/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LigaComponent } from './liga.component';

describe('LigaComponent', () => {
  let component: LigaComponent;
  let fixture: ComponentFixture<LigaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
