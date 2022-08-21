import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from "angular-datatables";
import { DatePipe } from '@angular/common';
import { TagifyModule } from 'ngx-tagify';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { HeaderComponent } from './shared/partials/header/header.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { NavbarComponent } from './shared/partials/navbar/navbar.component';
import { FooterComponent } from './shared/partials/footer/footer.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UnloggedGuard } from './shared/guards/unlogged.guard';
import { NouvelleProductionComponent } from './nouvelle-production/nouvelle-production.component';
import { TokenInterceptorService } from './shared/interceptor/token-interceptor.service';
import { ProfileComponent } from './profile/profile.component';
import { ReglagesComponent } from './reglages/reglages.component';
import { HistoriquesComponent } from './historiques/historiques.component';
import { ProgressBarComponent } from './shared/snippet/progress-bar/progress-bar.component';
import { CustomAdapterService } from './shared/services/custom/custom-adapter.service';
import { CustomDateParserFormatterService } from './shared/services/custom/custom-date-parser-formatter.service';
import { TruncatePipe } from './shared/services/pipes/truncate-pipe.service';
import { Etape1RenseignezproduitComponent } from './nouvelle-production/etape1-renseignezproduit/etape1-renseignezproduit.component';
import { Etape2ProduitSimilaireComponent } from './nouvelle-production/etape2-produit-similaire/etape2-produit-similaire.component';
import { Etape3CreationProduitComponent } from './nouvelle-production/etape3-creation-produit/etape3-creation-produit.component';
import { Etape4CompositionComponent } from './nouvelle-production/etape4-composition/etape4-composition.component';
import { Etape5CompositionAjustementComponent } from './nouvelle-production/etape5-composition-ajustement/etape5-composition-ajustement.component';
import { Etape6ProductionComponent } from './nouvelle-production/etape6-production/etape6-production.component';
import { Etape7TermineeComponent } from './nouvelle-production/etape7-terminee/etape7-terminee.component';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    HeaderComponent,
    ConnexionComponent,
    NavbarComponent,
    FooterComponent,
    CatalogueComponent,
    NouvelleProductionComponent,
    ProfileComponent,
    ReglagesComponent,
    HistoriquesComponent,
    ProgressBarComponent,
    TruncatePipe,
    Etape1RenseignezproduitComponent,
    Etape2ProduitSimilaireComponent,
    Etape3CreationProduitComponent,
    Etape4CompositionComponent,
    Etape5CompositionAjustementComponent,
    Etape6ProductionComponent,
    Etape7TermineeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DataTablesModule,
    ReactiveFormsModule,
    TagifyModule.forRoot()


  ],
  providers: [AuthGuard, UnloggedGuard, DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    {provide: NgbDateAdapter, useClass: CustomAdapterService},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatterService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
