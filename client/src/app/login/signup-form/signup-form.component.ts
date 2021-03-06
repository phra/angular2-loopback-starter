import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Users } from '../../../sdk/models';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styles: [require('./signup-form.component.css')],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class SignupFormComponent implements OnInit {

  @Output() trySignup = new EventEmitter();

  private user: Users = new Users();
  
  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.trySignup.emit( this.user );
    form.resetForm();
  }

}
