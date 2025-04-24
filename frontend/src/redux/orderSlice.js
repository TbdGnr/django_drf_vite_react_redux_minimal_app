// orderSlice.js : gère l’état de la commande actuelle

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

/*
  🎯 Action asynchrone (appel API) pour démarrer une commande.
  Elle envoie le numéro de téléphone à l'API et récupère la commande.
*/
export const startOrder = createAsyncThunk('order/startOrder', async (phone) => {
  const res = await axios.post('/api/order/start/', { phone })
  return res.data // ça retourne une commande (avec id, phone, items, etc.)
})

/*
  💡 L’état initial d’une commande
  - orderId : identifiant de la commande dans la base
  - phone : le numéro de téléphone saisi par l’utilisateur
  - items : liste des produits dans le panier
  - total : prix total de la commande
  - confirmed : est-ce que la commande a été validée
  - loading / error : pour gérer les chargements et erreurs
*/
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderId: null,
    phone: '',
    items: [],
    total: 0,
    loading: false,
    error: null,
    confirmed: false,
    confirmationInfo: null,
  },

  /*
    🎯 reducers : fonctions synchrones pour modifier l’état.
    Ici on a juste resetOrder (pour tout remettre à zéro après une commande).
  */
  reducers: {
    resetOrder: (state) => {
      state.orderId = null
      state.phone = ''
      state.items = []
      state.total = 0
      state.loading = false
      state.error = null
      state.confirmed = false
      state.confirmationInfo = null
    },
  },

  /*
    🎯 extraReducers : permet de gérer les actions asynchrones (comme startOrder)
    → on décrit comment l’état doit changer quand la requête démarre, réussit ou échoue
  */
  extraReducers: (builder) => {
    builder
      .addCase(startOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(startOrder.fulfilled, (state, action) => {
        state.loading = false
        const { id, phone, items, total, confirmed } = action.payload
        state.orderId = id
        state.phone = phone
        state.items = items
        state.total = total
        state.confirmed = confirmed
      })
      .addCase(startOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Quand on ajoute un produit
      .addCase(addItem.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.total = action.payload.total
      })

      // Quand on retire un produit
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.total = action.payload.total
      })
      .addCase(confirmOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.loading = false
        state.confirmed = true
        state.confirmationInfo = action.payload
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      

  },
})

// Ajouter un produit à la commande
export const addItem = createAsyncThunk('order/addItem', async ({ orderId, productId }) => {
  const res = await axios.post('/api/order/add-item/', {
    order_id: orderId,
    product_id: productId,
  })
  return res.data
})

// Retirer un produit
export const removeItem = createAsyncThunk('order/removeItem', async ({ orderId, productId }) => {
  const res = await axios.post('/api/order/remove-item/', {
    order_id: orderId,
    product_id: productId,
  })
  return res.data
})

// Confirmer la commande avec un code promo
export const confirmOrder = createAsyncThunk(
  'order/confirm',
  async ({ orderId, promoCode }) => {
    const res = await axios.post('/api/order/confirm/', {
      order_id: orderId,
      promo_code: promoCode,
    })
    return res.data
  }
)


// On exporte la fonction resetOrder (qu’on utilisera plus tard)
export const { resetOrder } = orderSlice.actions
// On exporte le reducer, à brancher dans le store
export default orderSlice.reducer
