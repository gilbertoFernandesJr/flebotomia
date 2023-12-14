import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {

  menuOpen: boolean = false;
  user: User = {id: 0, name: '', email: '', password: ''}
  modeValueDrawer: any = 'side';
  widthScreen: number = window.innerWidth;

  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    this.jwtService.findUserByToken().subscribe({
      next: res => this.user = res,
      error: error => console.log(error)
    });
    this.typeSidNavDrawer();
  }

  goSettings(): void {
    this.router.navigate(['/courses/start/settings']);
  }

  changeIcon(): void {
    if (this.widthScreen > 550) this.menuOpen = !this.menuOpen;
  }

  typeSidNavDrawer(): void {
    if (this.widthScreen < 550) this.modeValueDrawer = 'over';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['courses/auth']);
  }
}
