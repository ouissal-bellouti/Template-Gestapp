import { Component } from '@angular/core';
import { AuthentificationService } from './services/authentification.service';
import { User } from './pages/user';
import { Router } from '@angular/router';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Template GestApp';
  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthentificationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }


}
