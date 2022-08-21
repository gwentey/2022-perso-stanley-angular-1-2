import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-etape6-production',
  templateUrl: './etape6-production.component.html',
  styleUrls: ['./etape6-production.component.scss']
})
export class Etape6ProductionComponent implements OnInit {

  public dateFabrication: string = this.dateAdapter.toModel(this.ngbCalendar.getToday())!;

  constructor(public activeModal: NgbActiveModal, private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>) { }

  ngOnInit(): void {
  }

}
