import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Account } from '../../../sdk/models';

@Component({
  selector: 'login-form',
  template: require('./login-form.component.html'),
  styles: [require('./login-form.component.css')],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class LoginFormComponent implements OnInit {

  @Output() tryLogin = new EventEmitter();
  @Output() tryLogout = new EventEmitter();
  @Input() loggedUser: Account;

  private user = new Account();

  constructor() { }

  ngOnInit() {
  }

  onSubmitLogin(form: NgForm) {
    this.tryLogin.emit(this.user);
    form.resetForm();
  }

  onSubmitLogout(form: NgForm) {
    this.tryLogout.emit();
    form.resetForm();
  }

}
