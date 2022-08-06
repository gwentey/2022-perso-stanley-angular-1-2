import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  pseudo!: string
  password!: string


  constructor(private authService: AuthService, private _router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  seConnecter() {

    this.authService.seConnecter(this.pseudo, this.password).subscribe({
      next: jwt => {
        this.toastr.success('Connecté', '', {timeOut: 1500})
        var jwtFormat = jwt!.token
        localStorage.setItem('jwt', jwtFormat);
        this._router.navigate([""])
      },
      error: () => {
        this.toastr.error('Identifiants erronés!')

        // reset form
        this.pseudo = ""
        this.password = ""
      }
    })

  }


}
