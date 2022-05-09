import { Component } from '@angular/core';
import { AuthService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'routes-app';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    let token = localStorage.getItem('token');
    if(token) {
      this.auth.loggedIn.next(true);
    }
  }
}
