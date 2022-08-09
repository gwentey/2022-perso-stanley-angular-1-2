import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { HistoriquesComponent } from './historiques/historiques.component';
import { ProfileComponent } from './profile/profile.component';
import { ReglagesComponent } from './reglages/reglages.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UnloggedGuard } from './shared/guards/unlogged.guard';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent, canActivate: [UnloggedGuard] },
  { path: 'catalogue', component: CatalogueComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'reglages', component: ReglagesComponent, canActivate: [AuthGuard] },
  { path: 'historiques', component: HistoriquesComponent, canActivate: [AuthGuard] },

  { path: '', component: AccueilComponent, canActivate: [AuthGuard]  },
  { path: "**", component: ConnexionComponent, canActivate: [UnloggedGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
