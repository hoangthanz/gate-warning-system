import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {ActivatedRoute, Router} from "@angular/router";
import {finalize, first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | undefined;
  loading = false;
  submited = false;
  status = '';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.auth.isAuthenticated$.pipe(first()).subscribe(isAuthenticated => {
      const returnUrl =
        this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ||
        '/dashboard';

      if (isAuthenticated) {
        this.router.navigateByUrl(returnUrl);
      }
    });
  }

  get emailCtrl() {
    // @ts-ignore
    return this.loginForm.get('email');
  }
  get passwordCtrl() {
    // @ts-ignore
    return this.loginForm.get('password');
  }

  getControlValidateStatus(control: string) {
    // @ts-ignore
    if (this.submited || this.loginForm.get(control).touched) {
      // @ts-ignore
      return this.loginForm.get(control).valid ? 'success' : 'error';
    } else {
      return null;
    }
  }

  login() {
    // @ts-ignore
    const { value, valid } = this.loginForm;
    this.submited = true;
    if (valid) {
      const returnUrl =
        this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ||
        '/dashboard';
      this.loading = true;
      this.auth
        .login(value)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: v => {
            this.router.navigateByUrl(returnUrl);
          },
          error: e => {

          }
        });
    }
  }
}
