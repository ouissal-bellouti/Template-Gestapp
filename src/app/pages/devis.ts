import { LigneDevis } from 'src/app/pages/ligneDevis';
export class Devis {
  id : number;
  dateCreation : any;
  dateLivraison: any;
  nomClient: string;
  clientId: number;
  totTTC:number;
  totHT:number;
  ldevis : Array<LigneDevis> = [];
}
