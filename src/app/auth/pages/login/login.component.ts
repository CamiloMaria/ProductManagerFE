import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { authService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: authService, private router: Router) {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.invalid) {
      return;
    }
    this.authService.getUser(this.form.value.user, this.form.value.password).subscribe({
      next: (role) => {
        if (role) {
          localStorage.setItem('token', role.role)

          this.redirectBasedOnRole(role.role);
          this.form.reset();
        } else {
          console.log('Credenciales inválidas');
        }
      },
    })
  }

  redirectBasedOnRole(role: string) {
    const redirectRoutes = {
      'user': 'user',
      'seller': 'seller',
      'admin': 'admin',
      '': 'login'
    } as any;

    const redirectPath = redirectRoutes[role] || '/auth/login';
    this.router.navigate([redirectPath]);
  }
};