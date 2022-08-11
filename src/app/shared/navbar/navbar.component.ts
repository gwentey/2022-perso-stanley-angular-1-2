import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public utilisateurConnectee !: IUser


  constructor(private _modalService: NgbModal, private _authService: AuthService,
    private _navbarService : NavbarService) {

      // savoir s'il faut actualisé l'utilisateur
      this._navbarService.listen().subscribe(() => {
        this.refreshCurrentUser();
    })
     }

  ngOnInit(): void {
    this.utilisateurConnectee = this._authService.getCurrentUtilisateur()
  }

  // acutalisation de l'utilisateur current avec le token
  refreshCurrentUser() {
    this.utilisateurConnectee = this._authService.getCurrentUtilisateur()
  }

  // ouverture du modal
  open(content: any) {
    this._modalService.open(content)
  }

  // permet la deconnexion
  seDeconnecter(): void {
    this._authService.seDeconnecter();
  }


}
