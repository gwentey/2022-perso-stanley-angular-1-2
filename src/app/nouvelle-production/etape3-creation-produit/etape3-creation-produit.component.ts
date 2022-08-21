import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { IAtelier } from 'src/app/shared/interfaces/atelier';
import { IClasse } from 'src/app/shared/interfaces/classe';
import { IFamilleProduit } from 'src/app/shared/interfaces/familleProduit';
import { IProfesseur } from 'src/app/shared/interfaces/professeur';
import { IUniteeProduit } from 'src/app/shared/interfaces/uniteeProduit';
import { FamilleProduitService } from 'src/app/shared/services/famille-produit.service';
import { ProduitService } from 'src/app/shared/services/produit.service';

@Component({
  selector: 'app-etape3-creation-produit',
  templateUrl: './etape3-creation-produit.component.html',
  styleUrls: ['./etape3-creation-produit.component.scss']
})
export class Etape3CreationProduitComponent implements OnInit {

  public listeFamilleProduits: IFamilleProduit[] = []
  public listeUniteeProduits: IUniteeProduit[] = []

  public listeAteliers: IAtelier[] = []
  public listeClasses: IClasse[] = []
  public listeProfesseurs: IProfesseur[] = []
  public alertMessage: boolean = false
  public choixProduit !: string
  public nomProduitInterdit !: String

  public creationProduitForm !: FormGroup

  constructor(public activeModal: NgbActiveModal, private _produitService: ProduitService, private _familleProduitService: FamilleProduitService,
    public fb: FormBuilder) { }

  ngOnInit(): void {
    // récupération de toutes les unitées produits
    this._produitService.getAllUniteeProduit().subscribe({
      next: uniteeProduits => this.listeUniteeProduits = uniteeProduits
    })

    // récupération de tous les familles produits
    this._familleProduitService.getAllFamilleProduit().subscribe({
      next: familleProduits => this.listeFamilleProduits = familleProduits
    })

    if (this.choixProduit == this.nomProduitInterdit) {
      this.alertMessage = true
    }

    // création du formulaire
    this.creationProduitForm = this.fb.group({
      nomProduit: ['', Validators.required],
      familleProduit: ['', Validators.required],
      uniteeProduit: ['', Validators.required]
    });

    this.creationProduitForm.controls['uniteeProduit'].setValue(-1, { onlySelf: true });
    this.creationProduitForm.controls['familleProduit'].setValue(-1, { onlySelf: true });


  }

}
