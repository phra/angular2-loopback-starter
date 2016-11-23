import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Account } from '../../../sdk/models';

@Component({
  selector: 'signup-form',
  template: require('./signup-form.component.html'),
  styles: [require('./signup-form.component.css')],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class SignupFormComponent implements OnInit {

  @Input() loggedUser = new Account();
  @Output() trySignup = new EventEmitter();

  private user = new Account();
  
  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.trySignup.emit(this.user);
    form.resetForm();
  }

}
