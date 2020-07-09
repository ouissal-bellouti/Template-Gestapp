import { Client } from './client';
import { Devis } from './devis';
import { Paiment } from './paiement';

export class Facture {
  Id : string;
  Statut : any;
  Client: Client;
  DateGeneration: Date;
  DateEcheance: Date;
  Devis: Array<Devis>;
  Paiement: Paiment;

}
