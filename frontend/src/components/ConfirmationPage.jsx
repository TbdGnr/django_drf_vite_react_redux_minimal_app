import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { confirmOrder, resetOrder } from '../redux/orderSlice'
import { useNavigate } from 'react-router-dom'

export default function ConfirmationPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Champs pour le code promo
  const [promoCode, setPromoCode] = useState('')

  const {
    orderId,
    items: cartItems,
    total,
    confirmed,
    confirmationInfo,
    loading,
  } = useSelector((state) => state.order)

  // Si l'utilisateur arrive ici sans commande, on le redirige
  useEffect(() => {
    if (!orderId || cartItems.length === 0) {
      navigate('/order')
    }
  }, [orderId, cartItems, navigate])

  const handleConfirm = async () => {
    if (!orderId) return
    await dispatch(confirmOrder({ orderId, promoCode }))
  }

  const handleNewOrder = () => {
    dispatch(resetOrder())
    navigate('/')
  }

  return (
    <div className="container mt-5">
      <h2>Confirmation de votre commande</h2>

      {/* Récapitulatif des produits */}
      <ul className="list-group mb-3">
        {cartItems.map((item) => (
          <li key={item.product.id} className="list-group-item d-flex justify-content-between">
            <div>
              {item.product.name} x {item.quantity}
            </div>
            <strong>
              {(Number(item.product.price) * item.quantity).toFixed(2)} €
            </strong>
          </li>
        ))}
        <li className="list-group-item d-flex justify-content-between">
          <strong>Total</strong>
          <strong>{Number(total).toFixed(2)} €</strong>
        </li>
      </ul>

      {/* Si pas encore confirmé */}
      {!confirmed && (
        <>
          <div className="mb-3">
            <label htmlFor="promo">Code promo :</label>
            <input
              id="promo"
              type="text"
              className="form-control"
              placeholder="Ex : PROMO10"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
          </div>
          <button className="btn btn-success" onClick={handleConfirm} disabled={loading}>
            {loading ? 'Confirmation...' : 'Confirmer ma commande'}
          </button>
        </>
      )}

      {/* Après confirmation */}
      {confirmed && confirmationInfo && (
        <div className="alert alert-success mt-4">
          <h4>Commande confirmée 🎉</h4>
          <p>Montant initial : {Number(confirmationInfo.total).toFixed(2)} €</p>
          {confirmationInfo.discount > 0 && (
            <p>Remise : -{Number(confirmationInfo.discount).toFixed(2)} €</p>
          )}
          <p><strong>Total payé : {Number(confirmationInfo.final_total).toFixed(2)} €</strong></p>
          <button className="btn btn-primary mt-3" onClick={handleNewOrder}>
            Faire une nouvelle commande
          </button>
        </div>
      )}
    </div>
  )
}
