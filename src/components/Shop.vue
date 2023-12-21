<template>
  <section class="row text-light">
    <div class="col-12 text-center">
      <h3>Shop <i class="mdi mdi-cart"></i></h3>
    </div>
    <!-- SECTION click upgrades -->
    <!-- REVIEW the v-for repeats this column for each of our click upgrades -->
    <div class="col-4 text-center p-3" v-for="upgrade in clickUpgrades">
      +{{ upgrade.multiplier }} <i class="mdi mdi-mouse"></i>
      <button @click="buyClick(upgrade.id)" class="btn btn-primary w-100">
        <div class="fw-bold">{{ upgrade.picture }} {{ upgrade.name }} </div>
         <i class="mdi mdi-lightning-bolt text-warning"></i>{{ upgrade.price }}
      </button>
    </div>
    <div class="col-4 text-center p-3" v-for="upgrade in autoUpgrades">
      +{{ upgrade.multiplier }} <i class="mdi mdi-clock"></i>
      <button @click=buyAuto(upgrade.id) class="btn btn-success w-100">
        <div class="fw-bold">{{ upgrade.picture }} {{ upgrade.name }} </div>
         <i class="mdi mdi-lightning-bolt text-warning"></i>{{ upgrade.price }}
        </button>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { gamesService } from '../services/GameService.js';
export default {
  setup(){
  return {
    // REVIEW we bring in the data in our Appstate, with computed properties, as the data in the AppState changes our computeds and template will update
    clickUpgrades: computed(()=> AppState.clickUpgrades),
    autoUpgrades: computed(()=> AppState.autoUpgrades),
    buyClick(upgradeId){
      gamesService.buyUpgrade('clickUpgrades', upgradeId)
    },
    buyAuto(upgradeId){
      gamesService.buyUpgrade('autoUpgrades', upgradeId)
    }
   }
  }
};
</script>


<style lang="scss" scoped>

</style>
