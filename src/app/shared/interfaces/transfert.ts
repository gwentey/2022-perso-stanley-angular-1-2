import { ITypeTransfert } from "./typeTransfert"

export interface ITransfert {
  id: number
  quantite: number
  dateTransfert: Date
  prixUnitaire: number
  typeTransfert: ITypeTransfert
}
