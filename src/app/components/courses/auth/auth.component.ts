import { Credenciais } from './../../../models/credenciais';
import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  submit: boolean = false;

  public credenciais: Credenciais = {
    email: "",
    password: ""
  };

  /*Form*/
  public authForm: UntypedFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
      private formBuilder: UntypedFormBuilder,
      private service: AuthService,
      private router: Router,
      private toastr: ToastrService
  ) {}

  ngOnInit(): void {

  }

  submitForm() {
    if(this.authForm.valid) {

      this.submit = true;

      this.credenciais.email = this.authForm.get(['email'])?.value;
      this.credenciais.password = this.authForm.get(['password'])?.value;

      this.service.authenticate(this.credenciais).subscribe({
        next: (res) => {
          this.service.successAuth(res.token);
          this.router.navigate(['courses/start/all']);
        },
        error: (error) => {
          this.toastr.error('Usuário ou senha inválido.');
          this.submit = false;
          console.log(error);
        }
      })
    }
  }

}
