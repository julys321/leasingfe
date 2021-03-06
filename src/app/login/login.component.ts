import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../core/auth.service';
import {TokenStorage} from '../core/token.storage';
import {Globals} from '../services/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showNavbar = false;
  username: string;
  password: string;
  errorMessage: boolean;

  constructor(private router: Router,  private authService: AuthService, private token: TokenStorage) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.errorMessage = false;
  }

  login(): void {
    this.authService.attemptAuth(this.username, this.password).subscribe(
      data => {
        this.token.saveToken(data.token);
        this.router.navigate(['leasingOfficer']);
      }, error2 => {
        this.errorMessage = true;
      }
    );
  }

}
