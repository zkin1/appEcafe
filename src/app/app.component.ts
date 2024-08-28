import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  currentPage: string = 'main';

  constructor(private router: Router) {
    addIcons({ cafeOutline, cartOutline, personOutline });
  }
}
