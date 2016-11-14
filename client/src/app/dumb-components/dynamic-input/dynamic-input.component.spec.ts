import { ActivatedRoute, Data } from '@angular/router';
import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { DynamicInputComponent } from './dynamic-input.component';

describe('About', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DynamicInputComponent
    ]
  }));

  it('should log ngOnInit', inject([DynamicInputComponent], (dynamicInput: DynamicInputComponent) => {
    expect(dynamicInput.ngOnInit()).toBeTruthy();
  }));

});
