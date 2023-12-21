<template>
  <div class="center">
    <div>
      <section class="pong-wrapper">
        <img @click="mine" :src="sprinkles" class="mine-image bouncy-click" alt="Sprinkles the Ape">
        <div class="rotating">
          <div v-for="ball in ballCount" :style="`--offset: ${ball * 11}deg`" class="rotation-offset">
          <div class="pong-ball" :style="`--ball-offset: .${ball}s; --ball-size: ${ballSize||11}px`"></div>
          </div>
        </div>
      </section>
      <section>
      </section>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState.js'
import sprinkles from'../assets/img/Apes/Sprinkles.png'
import {ref} from 'vue'
export default {
  setup() {
    // REVIEW we can write normal JS inside the setup
    const ballCount = ref(0) // 'ref' creates an 'observable' value. if that value changes our page will update
    const gravity = ref(0)
    // REVIEW items in the 'return', are exposed to the 'template', thats what lets us reference them above
    return {
      ballCount,
      sprinkles,
      gravity,
      mine(){
        AppState.power++
      }
    }
  }
}
</script>

<style scoped lang="scss">

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
</style>
