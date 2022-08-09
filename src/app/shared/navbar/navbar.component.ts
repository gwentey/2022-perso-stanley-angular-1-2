import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public utilisateurConnectee !: IUser

  constructor(private _modalService: NgbModal, private _authService: AuthService) { }

  ngOnInit(): void {


    this.utilisateurConnectee = this._authService.getCurrentUtilisateur()


  }

  open(content: any) {
    this._modalService.open(content)
  }

  seDeconnecter(): void {
    this._authService.seDeconnecter();
  }


}
