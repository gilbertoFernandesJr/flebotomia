import { UserUpdate } from './../../../../models/user/user_update';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JwtService } from 'src/app/services/jwt.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  user: UserUpdate = {id:0, email: '', name: '', password: ''};
  updatePassword: boolean = false;
  showPassword: boolean = false;


  public userForm: UntypedFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    password: ['', [Validators.required]],
    newPassword: [''],
    confirmPassword: ['']
  });

  constructor(
    private jwtService: JwtService,
    private formBuilder: UntypedFormBuilder,
    private service: UserService,
    private toast: ToastrService
    ) {}

  ngOnInit(): void {
    this.jwtService.findUserByToken().subscribe({
      next: res => {
        this.user = res;
        this.joinFormWithUser();
      },
      error: error => {console.log(error)},
    });
  }

  joinFormWithUser(): void {
    this.userForm.get('email')?.setValue(this.user.email);
    this.userForm.get('name')?.setValue(this.user.name);
  }

  joinUserWithForm(): void {
    this.user.email = this.userForm.get('email')?.value;
    this.user.name = this.userForm.get('name')?.value;
    this.user.password = this.userForm.get('password')?.value;
    this.user.newPassword = this.userForm.get('newPassword')?.value;
    this.user.confirmPassword = this.userForm.get('confirmPassword')?.value;
  }

  showUpdatePass(): void {
    this.updatePassword = true;
  }

  update(): void {
    if (this.userForm.valid && this.confirmNewPass()) {
      this.joinUserWithForm();
      this.service.update(this.user).subscribe({
        next: res => {
          localStorage.setItem("access_token", res.token!);
          this.toast.success('Usuário atualizado');
          location.reload();
        },
        error: e => {
          if (e.error.message == 'Email already in use for other user') {
            this.toast.error('Email já usando por outro usuário')
          }
          else { this.toast.error('Credenciais inválidas'); }
          console.log(e);
        }
      });
    } else {
      if (!this.confirmNewPass()) this.toast.error('Nova senha não confirmado');
    }
  }

  confirmNewPass(): boolean {
    var newPass: string = this.userForm.get('newPassword')?.value;
    var confirmPass: string = this.userForm.get('confirmPassword')?.value;
    return newPass === confirmPass;
  }

  changeVisibilityPassword(): void {
    this.showPassword = !this.showPassword;
  }

}
