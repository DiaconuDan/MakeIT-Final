import { Component, ViewEncapsulation,ViewChild } from '@angular/core';
import { NavbarComponent } from  "./navbar/navbar.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild(NavbarComponent) private navbarComponent:NavbarComponent;
}
