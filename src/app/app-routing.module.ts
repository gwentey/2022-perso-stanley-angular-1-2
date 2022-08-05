import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UnloggedGuard } from './shared/guards/unlogged.guard';

const routes: Routes = [
  { path: '', component: AccueilComponent, canActivate: [AuthGuard]  },
  { path: 'connexion', component: ConnexionComponent, canActivate: [UnloggedGuard] },
  { path: 'catalogue', component: CatalogueComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
