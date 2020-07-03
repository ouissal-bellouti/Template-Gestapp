/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddCatgComponent } from './addCatg.component';

describe('AddCatgComponent', () => {
  let component: AddCatgComponent;
  let fixture: ComponentFixture<AddCatgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCatgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCatgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
