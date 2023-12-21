import { generateId } from "../utils/GenerateId.js"





export class Upgrade{
  constructor(data){
    this.id= data.id || generateId()
    this.name = data.name
    this.qty = data.qty
    this.multiplier = data.multiplier
    this.price = data.price
    this.picture = data.picture
  }
  get priceIncrease(){
    return Math.round((this.price / 5) + (this.price *(this.qty*.1)) )
  }
}
