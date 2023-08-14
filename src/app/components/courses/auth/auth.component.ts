import { Credenciais } from './../../../models/credenciais';
import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public credenciais: Credenciais = {
    email: "",
    password: ""
  };

  /*Form*/
  public authForm: UntypedFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  public isError: boolean = false;

  constructor(
      private formBuilder: UntypedFormBuilder,
      private service: AuthService,
      private router: Router
  ) {}

  ngOnInit(): void {

  }

  submitForm() {
    if(this.authForm.valid) {

      this.service.authenticate(this.credenciais).subscribe({
        next: (res) => {
          this.service.successAuth(res.body);
          this.router.navigate(['courses/start/all']);
        },
        error: (error) => this.isError = true
      })
    }
  }

}
