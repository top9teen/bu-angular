import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { UserModel } from '../shared/guard/user.service'
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../shared/guard/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup= this.fb.group({
    username: this.fb.control('admin', Validators.required),
    password: this.fb.control('admin', Validators.required)
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router,
    private translate: TranslateService) {
  }

  ngOnInit() {
    this.authService.checkAuthen();
  }

  onLoggedin() {
    if (this.loginForm.valid) {
        this.authService.login(this.loginForm.value).subscribe(
          () => {
            if (this.authService.isLoggedIn) {
              this.authService.redirectPage();
            }
          }, (err) => {
            console.log('error -> ', err);
          });
      } else {
        for (const field in this.loginForm.controls) {
          if (this.loginForm.get(field).invalid) {
            this.focusElement(field);
            return;
          }
        }

    }
  }
  focusElement(key: string) {
    // switch (key) {
    //   case 'username':
    //     this.username.nativeElement.focus();
    //     break;
    //   case 'password':
    //     this.username.nativeElement.focus();
    //     break;
    // }
  }

  
}
