import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from '../shared/interfaces/user';
import { AuthService } from '../shared/services/auth.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  lesProfiles : string[] = ["1","2","3","4","5","6","7","8","9","10"]
  prenom !: string
  nom !: string
  username !: string
  currentUser !: IUser
  profile !: string

  constructor(private _authService: AuthService, private _modalService: NgbModal) { }

  ngOnInit(): void {
    this.currentUser = this._authService.getCurrentUtilisateur()
    this.prenom = this.currentUser.prenom
    this.nom = this.currentUser.nom
    this.username = this.currentUser.username
    this.profile = this.currentUser.profile
  }

  open(content: any) {

    this._modalService.open(content)
  }


}
