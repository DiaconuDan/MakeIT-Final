import { Router } from '@angular/router';
import { AuthService } from './../core/auth.service';
import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../core/user.service';


@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.component.scss']
})

export class NavbarComponent {
    currentUser;
    constructor(
        public authService: AuthService,
        public userService : UserService,
        private location : Location,
        private router:Router){
            this.getCurrentUserLoggedIn();
        };

    logOut(){
        this.authService.doLogout()
        .then((res) => {
            this.router.navigate(['/login']);
        }, (error) => {
          console.log("Logout error", error);
        });
      }
    getCurrentUserLoggedIn(){
        this.userService.getCurrentUser()
        .then(res => {
            console.log(res);
            this.currentUser =  res;
        }, err => {
          this.router.navigate(['/login']);
        
        })

    }
     
}