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

@Component({
  selector: 'app-nouvelle-production',
  templateUrl: './nouvelle-production.component.html',
  styleUrls: ['./nouvelle-production.component.scss']
})


export class NouvelleProductionComponent implements OnInit, AfterViewInit {


  constructor(public activeModal: NgbActiveModal, private _produitService: ProduitService,
    private _atelierService: AtelierService, private _classeService: ClasseService,
    private _professeurService: ProfesseurService, private _familleProduitService: FamilleProduitService,
    private _compositionService: CompositionService, private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>
  ) { }

  // 5 steps : 1/ renseignez produits, 2/ (si trouver similaire) est-celui, 3/ (si non) crée produit,
  // 4/(si non) crée produit composition, 5/ composition ajustement,  6/ renseigner production, 7/ terminée
  public step: number = 0

  // etape 1
  public listeProduits: IProduit[] = []
  public listeProduitsNoms: string[] = []
  public choixProduit!: string;

  // etape 2 // produit existant
  public produitFound !: IProduit
  public nomProduitInterdit !: String

  // etape 3 : création produit
  public listeFamilleProduits: IFamilleProduit[] = []
  public listeUniteeProduits: IUniteeProduit[] = []

  public listeAteliers: IAtelier[] = []
  public listeClasses: IClasse[] = []
  public listeProfesseurs: IProfesseur[] = []
  public alertMessage: boolean = false

  // etape 4 : composition du produit
  settings: TagifySettings = {
    placeholder: 'Saisissez la composition du produit',
    enforceWhitelist: true
  };
  public whitelist$ !: BehaviorSubject<string[]>
  public listeCompositions: IComposition[] = []
  public listeCompositionsNoms: string[] = []

  public composition: any[] = []

  // epta 5 : composition produit ajustement
  public compositionChoix: IComposition[] = []

  // etape 6 : production renseignement
  public dateFabrication: string = this.dateAdapter.toModel(this.ngbCalendar.getToday())!;



  ngOnInit(): void {
    this._produitService.getAllProduit().subscribe({
      next: lesProduits => {
        // on stock tous les produits dans le tableau
        this.listeProduits = lesProduits
        // on ne récupère que le nom des produtis pour le mettre dans un tableau
        lesProduits.map(val => this.listeProduitsNoms.push(val.nom))
      },
      error: (err) => console.log("erreur", err)
    })
  }

  // permet de rechercher autocomplete
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.listeProduitsNoms.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  // permet de passer à l'étape suivante
  etapeSuivante(bonus?: number) {
    console.log(this.choixProduit)
    // etape suivante
    this.step = this.step + 1;
    // bonus ? si oui + bonus
    if (bonus) { this.step = this.step + bonus }

    // etape 2 le produit existe t'il ??
    if (this.step == 2) {
      // recherche si le produit selectionné existe
      if (this.listeProduits.map((prod) => prod.nom).some(x => x == this.choixProduit)) {
        var indexProduit = this.listeProduits.map((prod) => prod.nom).indexOf(this.choixProduit)
        this.produitFound = this.listeProduits[indexProduit]
        // si le produit existe il est impossible de crée un produit avec un nom similaire
        this.nomProduitInterdit = this.produitFound.nom

        // si pas de produit alors etape suivante
      } else {
        // passage etat 3 : produit existe pas
        this.step = this.step + 1
      }
    }

    // etape 3 : création produit
    if (this.step == 3) {
      // récupération de toutes les unitées produits
      this._produitService.getAllUniteeProduit().subscribe({
        next: uniteeProduits => this.listeUniteeProduits = uniteeProduits
      })
      // récupération de tous les familles produits
      this._familleProduitService.getAllFamilleProduit().subscribe({
        next: familleProduits => this.listeFamilleProduits = familleProduits
      })

      if(this.choixProduit == this.nomProduitInterdit){
        this.alertMessage = true
      }
    }

    // etape 4 : création produit composition
    if (this.step == 4) {
      // récupération de toutes les compositions
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

    // etape 5 : création produit composition personnalisation
    if (this.step == 5) {
      this.composition.forEach(compo => {
        this.listeCompositions.forEach(liste => {
          if (compo.value == liste.nom) {
            this.compositionChoix.push(liste)
          }
        });
      });
      setTimeout(() => {
        this.calculComposition()
      }, 0)


    }



  }

// permet de calculer dynamiquement les champs des compositions
  calculComposition() {
    var nbligne = document.getElementsByName('qt[]').length;
    var prixtotalcomposition = (document.getElementById("prixtotal") as HTMLInputElement);
    var tt = 0

    for (let i = 0; i < nbligne; i++) {
      var letotal = 0;

      var qt = (document.getElementsByName('qt[]')[i] as HTMLInputElement).value;
      var pu = (document.getElementsByName('pu[]')[i] as HTMLInputElement).value;
      var prixProduit = (document.getElementsByName('prix[]')[i] as HTMLInputElement);

      //si pas de quantité on ne fait pas de calcul
      if (qt == "") {
        prixProduit.value = "";
        continue; // on passe au suivant
      }

      letotal = letotal + ((Number(qt) * 10 * Number(pu) * 10) / 100);
      tt = tt + letotal;

      prixProduit.value = String((Math.round(letotal * 100) / 100).toFixed(2));
    }
    prixtotalcomposition.value = String((Math.round(tt * 100) / 100).toFixed(2));

  }

  // declanchement du level 1 après chargement de la page
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.step = 1
    }, 400)
  }

}
