import { IFacture } from "./facture"
import { IProduction } from "./production"

export interface IVente {
  id: number
  quantite: number
  prix_unitaire: number
  facture: IFacture
  production: IProduction
}
