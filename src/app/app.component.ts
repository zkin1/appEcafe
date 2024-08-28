import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { addIcons } from 'ionicons';
import { 
  homeOutline, 
  cartOutline, 
  personOutline, 
  logInOutline, 
  personAddOutline,
  settingsOutline,
  logOutOutline
} from 'ionicons/icons';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, RouterLinkActive]
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {
    addIcons({
      homeOutline,
      cartOutline,
      personOutline,
      logInOutline,
      personAddOutline,
      settingsOutline,
      logOutOutline
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get currentUserName(): string | undefined {
    return this.authService.getCurrentUser()?.name;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}