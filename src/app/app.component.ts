import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stanley';

  constructor(private _authService: AuthService){}

  ngOnInit(): void {
  }

  getConnecterOuPas(): boolean {
    return this._authService.connecterOuPas()
  }

}
