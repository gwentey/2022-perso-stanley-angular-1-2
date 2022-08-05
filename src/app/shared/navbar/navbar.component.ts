import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  closeResult = '';

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content : any) {
    this.modalService.open(content)
  }


}
