import { AppState } from "../AppState.js"
import { Upgrade } from "../models/Upgrade.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"



class GameService{

  mine(){
    AppState.power++
    let powerFromUpgrades = 0
    AppState.clickUpgrades.forEach(upgrade => {
      powerFromUpgrades += upgrade.multiplier * upgrade.qty
    })
    AppState.power += powerFromUpgrades
  }

  autoMine(){
    let powerFromUpgrades = 0
    AppState.autoUpgrades.forEach(upgrade => powerFromUpgrades += upgrade.multiplier * upgrade.qty)
    AppState.power += powerFromUpgrades
  }

    buyUpgrade(upgradeType, upgradeId){
      /** @type {Upgrade} */
      const upgrade = AppState[upgradeType].find(upgrade => upgrade.id == upgradeId)
      if(upgrade.price <= AppState.power){
        AppState.power -= upgrade.price
        upgrade.price += upgrade.priceIncrease
        upgrade.qty++
        Pop.toast(`${upgrade.name} was purchased`, 'success')
      } else {
        Pop.toast(`cannot afford ${upgrade.name}, need ${upgrade.price - AppState.power} more power.`, 'error')
      }
    }

}

export const gamesService = new GameService()
