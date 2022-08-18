import { IComposition } from "./composition"
import { IFamilleProduit } from "./familleProduit"
import { IUniteeProduit } from "./uniteeProduit"

export interface IProduit {
  id: number
  nom: string
  prix: number
  famille: IFamilleProduit
  unite: IUniteeProduit
  composition: IComposition[]
}
