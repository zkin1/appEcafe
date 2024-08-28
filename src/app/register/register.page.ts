import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class RegisterPage {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastController: ToastController
  ) { }

  async onSubmit() {
    if (this.authService.register(this.name, this.email, this.password)) {
      console.log('Registro exitoso');
      const toast = await this.toastController.create({
        message: 'Registro exitoso. Por favor, inicia sesión.',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
      toast.present();
      this.router.navigate(['/login']);
    } else {
      console.log('El registro falló. El usuario ya existe.');
      const toast = await this.toastController.create({
        message: 'El registro falló. El usuario ya existe.',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
    }
  }
}