import { IAtelier } from "./atelier"
import { IClasse } from "./classe"
import { IProduit } from "./produit"
import { IProfesseur } from "./professeur"

export interface IProduction {
  id: number
  temperature: Number
  dateFabrication: Date
  datePeremption: Date
  quantite: number
  conditionnement: number
  professeur: IProfesseur
  atelier: IAtelier
  classe: IClasse
  produit: IProduit
  prixParPortion: number



}
