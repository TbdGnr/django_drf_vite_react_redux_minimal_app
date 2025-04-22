// store.js : ce fichier configure le store Redux global

import { configureStore } from '@reduxjs/toolkit'
// On importe les reducers (slices) qu’on va créer
import orderReducer from './orderSlice'
import productsReducer from './productsSlice'

// On crée le store Redux en regroupant tous les "slices" (états logiques)
export const store = configureStore({
  reducer: {
    order: orderReducer,       // état de la commande en cours
    products: productsReducer, // état des produits disponibles
  },
})
