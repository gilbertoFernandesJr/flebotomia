import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, FormControl, UntypedFormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  /*Form*/
  authForm: UntypedFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: UntypedFormBuilder) {
  }

  ngOnInit(): void {

  }

  submitForm() {}

}
