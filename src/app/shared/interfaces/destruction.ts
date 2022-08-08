import { IProduction } from "./production"

export interface IDestruction {
  id: number
  date: Date
  quantite: number
  prixUnitaire: number
  production: IProduction
}
