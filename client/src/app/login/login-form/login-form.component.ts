import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Users } from '../../../sdk/models';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styles: [require('./login-form.component.css')],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class LoginFormComponent implements OnInit {

  @Output() tryLogin = new EventEmitter();
  @Output() tryLogout = new EventEmitter();
  @Input() loggedUser: Users;

  private user: Users = new Users();
  
  constructor() { }

  ngOnInit() {
  }

  onSubmitLogin(form: NgForm) {
    this.tryLogin.emit( this.user );
    form.resetForm();
  }

  onSubmitLogout(form: NgForm) {
    this.tryLogout.emit();
    form.resetForm();
  }

}
