import { generateId } from "../utils/GenerateId.js"





export class Upgrade{
  constructor(data){
    this.id= data.id || generateId()
    this.name = data.name
    this.qty = data.qty
    this.multiplier = data.multiplier
    this.price = data.price
    this.priceIncrease = data.priceIncrease  || 2
    this.picture = data.picture
  }
}
