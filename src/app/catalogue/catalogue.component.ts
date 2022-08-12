import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import * as traductionTableFrancais from '../../assets/traduction_table.json';
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

  constructor(private _productionService: ProductionService, private _datePipe: DatePipe) { }

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

  initialisationTable() {
    this.sub = this._productionService.getAllProduction().subscribe(data => {
      this.lesProductions = data;
      console.log(this.lesProductions)
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next(this.dtOptions);
    });
  }

  calculerDLC(date: Date): number {

    let currentDate = new Date();
    var dateSent = new Date(date);

    return Math.floor((Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) / (1000 * 60 * 60 * 24));
  }

  ngOnDestroy(): void {

    this.dtTrigger.unsubscribe();
    this.sub.unsubscribe();

  }

}
