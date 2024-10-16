import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { AuthResponse } from '../../models/auth-response.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;
  alertMessage: string = '';
  alertType: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.username = new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]);
    this.loginForm = this.fb.group({
      username: this.username,
      password: this.password,
    });
  }

  public onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe(
      (authResponse: AuthResponse) => {
        console.log('AuthResponse: ', authResponse);
        this.router.navigate(['/admin']);
      },
      (error) => {
        if (error.status === 403) {
          this.toastr.error('Username or password is incorrect', 'Login Failed');
        } else {
          this.toastr.error('An unexpected error occurred', 'Error');
        }
      }
    );
  }
}
