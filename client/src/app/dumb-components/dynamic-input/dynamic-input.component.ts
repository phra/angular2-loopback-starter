import { Component, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserApi } from '../../sdk/index';

@Component({
  selector: 'dynamic-input',
  styles: [`
  `],
  template: `
    <div class="field-wrap">
      <label>
        {{ label }}<span *ngIf="required" class="req">*</span>
      </label>
      <input #input (keyup)="onKey(input.value)" type="password"required autocomplete="{{ autocomplete }}"/>
    </div>
  `
})
export class DynamicInputComponent {
  @Input() label: string = 'MISSING LABEL';
  @Input() required: boolean = false;
  @Input() autocomplete: string = 'on';

  constructor() {
  }

  ngOnInit(): boolean {
    return true;
  }

  onKey(value: string) {

  }

}
