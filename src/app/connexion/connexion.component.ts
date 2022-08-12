import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit, OnDestroy {

  pseudo!: string
  password!: string
  sub : any

  constructor(private authService: AuthService, private _router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {


  }

  seConnecter() {

    this.sub = this.authService.seConnecter(this.pseudo, this.password).subscribe({
      next: jwt => {
        this.toastr.success('Connecté', '', { timeOut: 1500 })
        var jwtFormat = jwt!.token
        localStorage.setItem('jwt', jwtFormat);
        console.log("fonctionne")
        this._router.navigate([""])
      },
      error: () => {
        this.toastr.error('Identifiants erronés!')
        console.log("erreur connection")

        // reset form
        this.pseudo = ""
        this.password = ""
      }
    })

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
