import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Users } from '../../../sdk/models';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
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
