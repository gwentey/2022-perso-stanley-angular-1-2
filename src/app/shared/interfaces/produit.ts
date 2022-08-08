import { IFamilleProduit } from "./familleProduit"
import { IUniteeProduit } from "./uniteeproduit"

export interface IProduit {
  id: number
  nom: string
  prix: number
  famille: IFamilleProduit
  unite: IUniteeProduit
}
