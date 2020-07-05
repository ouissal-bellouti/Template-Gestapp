import { Article } from './article';

export class Facture {
  id : number;
  Statut : any;
  NomClient: string;
  DateGeneration: Date;
  ClientId: number;
  DateEcheance:Date;
  DevisId:number;
  Produitid:number;
  Article: Array<Article> = [];

}
