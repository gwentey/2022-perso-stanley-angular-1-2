import { IClient } from "./client"
import { IVente } from "./vente"

export interface IFacture {
  id: number
  dateCreation: Date
  dateReglement: Date
  client : IClient
  vente : IVente[]


}
