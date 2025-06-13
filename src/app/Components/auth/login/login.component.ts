import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/Services/auth.service';
import { SharedModule } from '../../../shared/shared.module';
//import Logo from 'src/Logo_Nexora.png';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule], // Import necessary modules
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm;
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  register() {
    this.router.navigate(['/register']);
  }
  login() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.error = '';
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Invalid email or password.';
      }
    });
  }
}