import { Client } from './client';
import { Devis } from './devis';

export class Facture {
  Id : string;
  Statut : any;
  Client: Client;
  DateGeneration: Date;
  ClientId: number;
  DateEcheance: Date;
  Devis: Array<Devis>;

}
