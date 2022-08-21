import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { IComposition } from 'src/app/shared/interfaces/composition';

@Component({
  selector: 'app-etape5-composition-ajustement',
  templateUrl: './etape5-composition-ajustement.component.html',
  styleUrls: ['./etape5-composition-ajustement.component.scss']
})
export class Etape5CompositionAjustementComponent implements OnInit {

  public compositionChoix: IComposition[] = []
  public composition: any[] = []
  public listeCompositions: IComposition[] = []



  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
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



}
