import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { IProduit } from '../shared/interfaces/produit';
import { ProductionService } from '../shared/services/production.service';
import { ProduitService } from '../shared/services/produit.service';

@Component({
  selector: 'app-nouvelle-production',
  templateUrl: './nouvelle-production.component.html',
  styleUrls: ['./nouvelle-production.component.scss']
})


export class NouvelleProductionComponent implements OnInit {


  constructor(public activeModal: NgbActiveModal, private _produitService : ProduitService) { }

  public listeProduits : IProduit[] = []
  public listeProduitsNoms : string[] = []
  public choixProduit!: string;
  // 5 steps : 1/ renseignez produits, 2/ (si trouver similaire) est-celui, 3/ (si non) crée produit, 4/renseigner production, 5/ terminée
  public step: number = 1

  ngOnInit(): void {
    this._produitService.getAllProduit().subscribe({
      next : lesProduits => {
        // on stock tous les produits dans le tableau
        this.listeProduits = lesProduits
        // on ne récupère que le nom des produtis pour le mettre dans un tableau
        lesProduits.map(val => this.listeProduitsNoms.push(val.nom))
      },
      error: () => console.log("erreur")
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
    this.step = this.step + 1
    if(this.step == 2){
      console.log("ici", this.listeProduits.map((prod) => prod.nom).some(x => x == this.choixProduit))

    }
  }

  // chercher si le produit existe déjà ou faut-il le crée ?
  chercherLeProduit() : boolean {

    return true
  }

}
