import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

import * as traductionTableFrancais from '../../assets/traduction_table.json';
import { NouvelleProductionComponent } from '../nouvelle-production/nouvelle-production.component';
import { IProduction } from '../shared/interfaces/production';
import { ProductionService } from '../shared/services/production.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})

export class CatalogueComponent implements OnInit, OnDestroy {

  langueFR = traductionTableFrancais

  dtOptions: DataTables.Settings = {}
  lesProductions: IProduction[] = []
  dtTrigger: Subject<any> = new Subject<any>();
  sub : any;

  constructor(private _productionService: ProductionService, private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.initialisationTable()

    this.dtOptions = {
      dom: "<'row catalogue'<'col-sm-12 col-md-10'f><'col-sm-12 col-md-2 text-right'l>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
      pageLength: 10,
      processing: true,
      language: this.langueFR,
      lengthMenu: [10, 20, 30, 40],
      columnDefs: [{
        "targets": [-1, -2, -3, -4],
        "orderable": false
      }]
    }

  }

  // initialisation de la table des productions
  initialisationTable() {
    this.sub = this._productionService.getAllProduction().subscribe(data => {
      this.lesProductions = data;
      console.log(this.lesProductions)
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next(this.dtOptions);
    });
  }

  // permet de calculer le temps de jour restant de consommation (DLC)
  calculerDLC(date: Date): number {

    let currentDate = new Date();
    var dateSent = new Date(date);

    return Math.floor((Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) / (1000 * 60 * 60 * 24));
  }

  // déinscription des observables
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.sub.unsubscribe();

  }

  open() {
    const modalRef = this.modalService.open(NouvelleProductionComponent);
  }
}
