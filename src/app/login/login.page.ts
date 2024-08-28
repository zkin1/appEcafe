import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastController: ToastController
  ) { }

  async onSubmit() {
    if (this.authService.login(this.email, this.password)) {
      console.log('Login exitoso');
      if (this.authService.isAdmin()) {
        console.log('Usuario es administrador');
        this.router.navigate(['/admin']);
      } else {
        console.log('Usuario normal');
        this.router.navigate(['/main']);
      }
    } else {
      console.log('Login fallido');
      const toast = await this.toastController.create({
        message: 'Credenciales incorrectas. Por favor, intente de nuevo.',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
    }
  }
}