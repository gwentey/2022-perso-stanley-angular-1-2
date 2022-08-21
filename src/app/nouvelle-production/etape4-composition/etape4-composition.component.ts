import { Component, OnInit } from '@angular/core';
import { TagifySettings } from 'ngx-tagify';
import { BehaviorSubject } from 'rxjs';
import { NgbActiveModal, NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { IComposition } from 'src/app/shared/interfaces/composition';
import { CompositionService } from 'src/app/shared/services/composition.service';

@Component({
  selector: 'app-etape4-composition',
  templateUrl: './etape4-composition.component.html',
  styleUrls: ['./etape4-composition.component.scss']
})
export class Etape4CompositionComponent implements OnInit {

  settings: TagifySettings = {
    placeholder: 'Saisissez la composition du produit',
    enforceWhitelist: true
  };
  public whitelist$ !: BehaviorSubject<string[]>
  public listeCompositions: IComposition[] = []
  public listeCompositionsNoms: string[] = []

  public composition: any[] = []

  constructor(public activeModal: NgbActiveModal, private _compositionService: CompositionService) { }

  ngOnInit(): void {
    this._compositionService.getAllComposition().subscribe({
      next: compositions => {
        // on stock toutes les compositions dans le tableau
        this.listeCompositions = compositions
        // on ne récupère que le nom des compositions pour le mettre dans un tableau
        compositions.map(val => this.listeCompositionsNoms.push(val.nom))
      }
    })
    // initialisation de la whitelist tagify
    this.whitelist$ = new BehaviorSubject<string[]>(this.listeCompositionsNoms);
  }


}
