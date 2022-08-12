import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-nouvelle-production',
  templateUrl: './nouvelle-production.component.html',
  styleUrls: ['./nouvelle-production.component.scss']
})


export class NouvelleProductionComponent implements OnInit {

  states = ['salade de tomate', 'soupe a l ognoin', 'salade de fruit', 'beouf legume', 'cheval a la truffe'];

  constructor(public activeModal: NgbActiveModal) { }

  public listeProduits : String[] = []
  public model: any;
  public step: number = 1

  ngOnInit(): void {
  }

  // permet de rechercher autocomplete
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  // permet de passer à l'étape suivante
  etapeSuivante() {
    this.step = this.step + 1
  }

  // chercher si le produit existe déjà ou faut-il le crée ?
  chercherLeProduit() : boolean {

    return true
  }

}
