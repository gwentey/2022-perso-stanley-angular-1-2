import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  loginForm = {
    pseudo: "",
    password: ""
  }

  constructor(private authService: AuthService, private _router : Router) { }

  ngOnInit(): void {

    console.log(this.authService.getCurrentUtilisateur()!);
  }

  seConnecter() {

    this.authService.seConnecter(this.loginForm.pseudo, this.loginForm.password).subscribe({
      next: utilisateur => {
        this.authService.setCurrentUtilisateur(utilisateur)
        this._router.navigate([""])
       }
    })

  }

}
