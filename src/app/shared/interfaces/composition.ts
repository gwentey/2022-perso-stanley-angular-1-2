import { IUniteeProduit } from "./uniteeProduit"

export interface IComposition {
  id: number
  nom: string
  prix: number
  unitee: IUniteeProduit

}
