import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map, Observable, OperatorFunction } from 'rxjs';
import { IProduit } from 'src/app/shared/interfaces/produit';
import { ProduitService } from 'src/app/shared/services/produit.service';

@Component({
  selector: 'app-etape1-renseignezproduit',
  templateUrl: './etape1-renseignezproduit.component.html',
  styleUrls: ['./etape1-renseignezproduit.component.scss']
})
export class Etape1RenseignezproduitComponent implements OnInit {

  public listeProduits: IProduit[] = []
  public listeProduitsNoms: string[] = []
  public choixProduit!: string;

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
  }

  // permet de rechercher autocomplete
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.listeProduitsNoms.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

}
