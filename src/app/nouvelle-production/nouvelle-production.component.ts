import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { IProduit } from '../shared/interfaces/produit';
import { ProduitService } from '../shared/services/produit.service';

@Component({
  selector: 'app-nouvelle-production',
  templateUrl: './nouvelle-production.component.html',
  styleUrls: ['./nouvelle-production.component.scss']
})


export class NouvelleProductionComponent implements OnInit, AfterViewInit {


  constructor(public activeModal: NgbActiveModal, private _produitService: ProduitService) { }

  // 5 steps : 1/ renseignez produits, 2/ (si trouver similaire) est-celui, 3/ (si non) crée produit, 4/renseigner production, 5/ terminée
  public step: number = 0

  // etape 1
  public listeProduits: IProduit[] = []
  public listeProduitsNoms: string[] = []
  public choixProduit!: string;

  // etape 2
  public produitFound !: IProduit

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
  etapeSuivante() {
    // etape suivante
    this.step = this.step + 1
    // etape le produit existe t'il ??
    if (this.step == 2) {
      // recherche si le produit selectionné existe
      if (this.listeProduits.map((prod) => prod.nom).some(x => x == this.choixProduit)) {
        var indexProduit = this.listeProduits.map((prod) => prod.nom).indexOf(this.choixProduit)
        this.produitFound = this.listeProduits[indexProduit]

        // si pas de produit alors etape suivante
      } else {
        // passage etat 3
        this.step = this.step + 1
      }

    }
  }

  // chercher si le produit existe déjà ou faut-il le crée ?
  chercherLeProduit(): boolean {
    return true
  }

  // declanchement du level 1 après chargement de la page
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.step = 1
    }, 400)
  }

}
