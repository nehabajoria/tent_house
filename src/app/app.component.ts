import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { IUser } from './interface/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tentHouse';
  currentUser: IUser;

  constructor(
    private router: Router,
    private authenticationService: LoginService
) {
    this.authenticationService.currentUser.subscribe(x => {
      console.log(x + "--x")
      this.currentUser = x
    });
}

logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
