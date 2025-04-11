import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';

interface LoginFormControls {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup<LoginFormControls>;
  isUsernameExists = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: this.fb.control('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: this.fb.control('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  ngOnInit(): void {
    this.loginForm.controls.username.valueChanges
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe((value) => {
        const user = this.authService.getUserByUsername(value);
        this.isUsernameExists = user?.username === value;
      });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;

    try {
      this.authService.login(username!, password!);
      this.router.navigate(['/todos']);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === '404') {
          alert('User not found');
        } else if (error.message === '401') {
          alert('Invalid password');
        }
      }
      console.log(error);
    }
  }
}
