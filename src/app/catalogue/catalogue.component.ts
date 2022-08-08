import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import * as traductionTableFrancais from '../../assets/traduction_table.json';
import { IProduit } from '../shared/interfaces/produit';
import { ProduitService } from '../shared/services/produit.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit, OnDestroy {

  langueFR = traductionTableFrancais

  dtOptions: DataTables.Settings = {}
  lesProduits: IProduit[] = []
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private _produitService: ProduitService) { }

  ngOnInit(): void {
    this.initialisationTable()

    this.dtOptions = {
      pageLength: 10,
      processing: true,
      language: this.langueFR,
      lengthMenu: [10, 20, 30, 40],
    }

  }

  initialisationTable() {
    this._produitService.getAllProduit().subscribe(data => {
      this.lesProduits = data;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next(this.dtOptions);
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
