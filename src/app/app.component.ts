import {ChangeDetectorRef, Component} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'fs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public auth: AuthService, private cd: ChangeDetectorRef) {
    this.auth.jwtExpiration.subscribe(
      () => this.cd.detectChanges()
    );
  }
}
