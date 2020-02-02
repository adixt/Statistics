import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Module8Component } from './module8.component';

describe('Module8Component', () => {
  let component: Module8Component;
  let fixture: ComponentFixture<Module8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Module8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Module8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
