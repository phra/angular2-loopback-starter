import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Users } from '../../../sdk/models';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Output() tryLogin = new EventEmitter();

  private user: Users = new Users();
  
  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.tryLogin.emit( this.user );
    form.resetForm();
  }

}
