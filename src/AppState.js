import { reactive } from 'vue'
import { Upgrade } from './models/Upgrade.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  power:0,

  clickUpgrades: [
    new Upgrade({
      name: 'Pong Blade',
      qty: 0,
      multiplier: 1,
      price: 50,
      picture: '🏓'
    }),
    new Upgrade({
      name: 'Sports Cupcake',
      qty: 0,
      multiplier: 3,
      price: 250,
      picture: '🧁'
    }),
    new Upgrade({
      name: 'Banana Sandwich',
      qty: 0,
      multiplier: 5,
      price: 500,
      picture: '🥪'
    }),
  ],

  autoUpgrades: [
    new Upgrade({
      name: 'Pong Ball',
      qty: 0,
      multiplier: 3,
      price: 500,
      picture: '⏺️'
    }),
    new Upgrade({
      name: 'Laser Accuracy',
      qty: 0,
      multiplier: 10,
      price: 1000,
      picture: '⚡'
    }),
    new Upgrade({
      name: 'Sport Crocs',
      qty: 0,
      multiplier: 25,
      price: 7000,
      picture: '👟'
    }),
  ]
})
