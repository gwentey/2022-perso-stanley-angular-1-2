import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import * as traductionTableFrancais from '../../assets/traduction_table.json';
import { IProduction } from '../shared/interfaces/production';
import { ProductionService } from '../shared/services/production.service';
import { ProduitService } from '../shared/services/produit.service';

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

  constructor(private _productionService: ProductionService) { }

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

    }

  }

  initialisationTable() {
    this._productionService.getAllProduction().subscribe(data => {
      this.lesProductions = data;
      console.log(this.lesProductions)
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next(this.dtOptions);
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
