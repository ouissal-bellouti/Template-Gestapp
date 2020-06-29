import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ProduitsComponent } from '../../pages/produits/produits.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UtilisateursComponent } from '../../pages/utilisateurs/utilisateurs.component';
import { ClientsComponent } from '../../pages/clients/clients.component';
import { DevisComponent } from '../../pages/devis/devis.component';
import { FactureComponent } from 'src/app/pages/facture/facture.component';
import { PaiementComponent } from 'src/app/pages/paiement/paiement.component';
import { ProduitAddComponent } from 'src/app/pages/produits/produit-add/produit-add.component';
import { ProduitEditComponent } from 'src/app/pages/produits/produit-edit/produit-edit.component';
import { ProduitDetailComponent } from 'src/app/pages/produits/produit-detail/produit-detail.component';



// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'produits', component: ProduitsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'utilisateurs', component: UtilisateursComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'devis', component: DevisComponent },
  { path: 'facture', component: FactureComponent },
  { path: 'paiement', component: PaiementComponent},
  { path: 'produit-add', component: ProduitAddComponent},
  { path: 'produit-edit', component: ProduitEditComponent},
  { path: 'produit-detail', component: ProduitDetailComponent}

];
