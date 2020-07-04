import { LigneFacture } from 'src/app/pages/lignefacture';
export class Facture {
  id : number;
  Statut : any;
  NomClient: string;
  DateGeneration: Date;
  ClientId: number;
  DateEchence:Date;
  DevisId:number;
  Produitid:number;
  lfacture: Array<LigneFacture> = [];

}
