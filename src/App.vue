<template>
  <header class="container-fluid">
    <div class="row  align-items-center text-light mt-5">
      <!-- REVIEW here we are inject our data into our template, between tags as content on the page {{  }} -->
      <div class="col-6 col-md-4 order-2 order-md-1 text-end">{{ clickPower }}<i class="mdi mdi-mouse" title="click power"></i></div>
      <div class="col-12 col-md-4 order-1 order-md-2 text-center text-light fw-bold fs-3"><i class="mdi mdi-lightning-bolt text-warning"></i>{{ currentPower }}</div>
      <!-- REVIEW we can hide this element using v-if. if the condition is not true, the element wont be added -->
      <div v-if="autoPower > 0" class="col-6 col-md-4 order-3">
        <i class="mdi mdi-clock"></i>
        {{ autoPower }}
        <div class="timer-wrapper">
          <span class="timer-bar"></span>
        </div>
      </div>
    </div>
  </header>
  <main>
    <div class="center">
    <div>
      <!-- SECTION where sprinkles and the rotating pong balls are -->
      <section class="pong-wrapper">
        <!-- REVIEW this @click is vue's event handler -->
        <!-- REVIEW Here we are also injecting our data, inside the tag as values for attributes : on the src-->
        <img @click="mine()" @contextmenu.prevent="changePlayer()" :src="activePlayer" class="mine-image bouncy-click" alt="Sprinkles the Ape">
        <div class="rotating">
          <!-- REVIEW the v-for, is a way for us to loop our html, this 'section' and the elements inside it will be repeated, once for each ball in ballCount (ball in this case will be a number) -->
          <section v-for="ball in ballCount" :style="`--offset: ${ball * 11}deg`" class="rotation-offset">
            <!-- this is some fancy data interpolation so our css, is reactive to our data in the script -->
          <div class="pong-ball" :style="`--ball-offset: .${ball}s; --ball-size: ${ballSize}px`"></div>
          </section>
        </div>

      </section>
      <!--  -->
      <section>
      </section>
    </div>
  </div>
  </main>
  <!--  -->
  <footer class="container">
        <!-- NOTE this Shop tag, is actually the entire shop component from the components folder -->
        <!-- the template, style and script tag will be injected here at this point -->
        <Shop/>
  </footer>
</template>


<script>
import sprinkles from'./assets/img/Apes/Sprinkles.png'
import busho from'./assets/img/Apes/Busho.png'
import thorsten from'./assets/img/Apes/Thorsten.png'
import georgie from'./assets/img/Apes/Georgie.png'
import {onMounted, ref} from 'vue'
import { computed } from 'vue'
import { AppState } from './AppState'
import { gamesService } from './services/GameService.js'
import Shop from './components/Shop.vue'

export default {
    setup() {
        // NOTE we can write normal JS inside the setup
        // computed pulls a value out of the reactive state, and observes it
        const ballCount = computed(()=> AppState.autoUpgrades.find(up => up.name == 'Pong Ball').qty)
        // REVIEW refs are observable values, as the value changes the template will update
        const players = [ busho, thorsten, georgie]
        const activePlayer = ref(sprinkles)
        const ballSize = ref(11)
        // REVIEW onMounted will run when this component loads, in our case it loads when the App.vue loads
        onMounted(()=>{
          setInterval(gamesService.autoMine, 3000)
        })
        return {
            // REVIEW items in the 'return', are exposed to the 'template', thats what lets us reference them above
            appState: computed(() => AppState),
            currentPower: computed(() => AppState.power),
            // REVIEW computed values can be more complex functions too, as long as those function return a value
            clickPower: computed(()=> {
              let power = 1 // start at one for the single click
              AppState.clickUpgrades.forEach(up => power += up.qty * up.multiplier)
              return power
            }),
            autoPower: computed(()=>{
              let power = 0
              AppState.autoUpgrades.forEach(up => power += up.qty * up.multiplier)
              return power
            }),
            // REVIEW if you create a variable outside the 'return' and want to use it in the template, it has to be included in the return
            ballCount,
            ballSize,
            activePlayer,
            // this is a function the template can call, check out the @click
            mine() {
                gamesService.mine();
            },
            changePlayer(){
              // REVIEW, when accessing, refs inside your script, their value needs to be accessed, if you want to get, or set a new value
              players.push(activePlayer.value)
              activePlayer.value = players.shift()
            }
        };
    },
    components: { Shop }
}
</script>


<style lang="scss">
@import "./assets/scss/main.scss";
main{
  display: flex;
  flex-direction: column;
  min-height: 50vh;
  max-width: 100dvw;
  overflow-y: visible;
  overflow-x: visible;
}

footer{
  height: 10vh;
}


.center{
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mine-image{
  height: 40vh;
  aspect-ratio: 1/1;
  pointer-events: all !important;
}

.pong-wrapper{
  position: relative;
  pointer-events: none;
  user-select: none;
  *{
    pointer-events: none;
    user-select: none;
  }
}

.rotation-offset{
  transform: rotate(var(--offset));
  width: 100%;
  height: 100%;
  position: absolute;
  top:var(--gravity);
}

.pong-ball{
  height: var(--ball-size);
  width: var(--ball-size);
  border-radius: 50px;
  background-color: whitesmoke;
  position: absolute;
  left: 50%;
  margin-left: var(--margin);
  transform: translateY(50px);
  animation: ball-bounce .4s var(--ball-offset)  infinite alternate cubic-bezier(0.39, 0.575, 0.565, 1);
}
.rotating{
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  animation: spin360 5s infinite linear;
}
@keyframes spin360 {
0%{
  transform: rotate(0deg);
}
50%{
  transform: rotate(180deg);
}
100%{
  transform: rotate(360deg);
}
}

.timer-wrapper{
  height: 10px;
  width: 50%;
  .timer-bar{
    display: block;
    height: 10px;
    border-radius: 50px;
    background-color: var(--bs-light);
    animation: timer-bar 3s linear infinite;
  }
}
@keyframes timer-bar {
  0%{
    width: 100%
  }
  100%{
    width: 0%;
  }

}
</style>
