import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { TagifySettings } from 'ngx-tagify';
import { BehaviorSubject } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { IAtelier } from '../shared/interfaces/atelier';
import { IClasse } from '../shared/interfaces/classe';
import { IFamilleProduit } from '../shared/interfaces/familleProduit';
import { IProduit } from '../shared/interfaces/produit';
import { IProfesseur } from '../shared/interfaces/professeur';
import { IUniteeProduit } from '../shared/interfaces/uniteeProduit';
import { AtelierService } from '../shared/services/atelier.service';
import { ClasseService } from '../shared/services/classe.service';
import { FamilleProduitService } from '../shared/services/famille-produit.service';
import { ProduitService } from '../shared/services/produit.service';
import { ProfesseurService } from '../shared/services/professeur.service';
import { CompositionService } from '../shared/services/composition.service';
import { IComposition } from '../shared/interfaces/composition';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nouvelle-production',
  templateUrl: './nouvelle-production.component.html',
  styleUrls: ['./nouvelle-production.component.scss']
})


export class NouvelleProductionComponent implements OnInit, AfterViewInit {

  // 5 steps : 1/ renseignez produits, 2/ (si trouver similaire) est-celui, 3/ (si non) crée produit,
  // 4/(si non) crée produit composition, 5/ composition ajustement,  6/ renseigner production, 7/ terminée
  public step: number = 0

  constructor(public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {

  }


  // permet de passer à l'étape suivante
  etapeSuivante(bonus?: number) {
    // etape suivante
    this.step = this.step + 1;
    // bonus ? si oui + bonus
    if (bonus) { this.step = this.step + bonus }

  }


  // declanchement du level 1 après chargement de la page
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.step = 1
    }, 400)
  }

}
