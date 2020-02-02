import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isMenuOpen = false;
  title = 'Statistics';

  public toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
