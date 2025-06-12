import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/Services/auth.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule], // Import necessary modules
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm;
  message = '';
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  login() {
    this.router.navigate(['/login']);
  }
  register() {
    if (this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.message = 'Registration successful!';
        this.error = '';
        this.registerForm.reset();

      },
      error: (err) => {
        this.error = err.error[0]?.description || 'Registration failed.';
        this.message = '';
      }
    });
  }
}
