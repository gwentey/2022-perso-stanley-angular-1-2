import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { IProduit } from 'src/app/shared/interfaces/produit';
import { ProduitService } from 'src/app/shared/services/produit.service';

@Component({
  selector: 'app-etape2-produit-similaire',
  templateUrl: './etape2-produit-similaire.component.html',
  styleUrls: ['./etape2-produit-similaire.component.scss']
})
export class Etape2ProduitSimilaireComponent implements OnInit {

  public produitFound !: IProduit
  public nomProduitInterdit !: String
  public listeProduits: IProduit[] = []
  public listeProduitsNoms: string[] = []
  public choixProduit !: string

  constructor(public activeModal: NgbActiveModal, private _produitService: ProduitService) { }

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

    // recherche si le produit selectionné existe
    if (this.listeProduits.map((prod) => prod.nom).some(x => x == this.choixProduit)) {
      var indexProduit = this.listeProduits.map((prod) => prod.nom).indexOf(this.choixProduit)
      this.produitFound = this.listeProduits[indexProduit]
      // si le produit existe il est impossible de crée un produit avec un nom similaire
      this.nomProduitInterdit = this.produitFound.nom

      // si pas de produit alors etape suivante
    } else {
      // passage etat 3 : produit existe pas
    }

  }
}
