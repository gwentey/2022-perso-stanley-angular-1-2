import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private modalService: NgbModal, private _authService: AuthService) { }

  ngOnInit(): void {
    console.log(this._authService.connecterOuPas());
  }

  open(content : any) {
    this.modalService.open(content)
  }

  seDeconnecter() : void {
    this._authService.seDeconnecter();
  }


}
