// PhoneEntry.jsx : page d’accueil avec le champ numéro de téléphone

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { startOrder } from '../redux/orderSlice'

export default function PhoneEntry() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [phone, setPhone] = useState('') // état local du champ

  // On récupère l’état global Redux pour afficher erreurs et chargement
  const { loading, error } = useSelector((state) => state.order)

  // Quand on soumet le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Lancer l’action Redux qui appelle l’API
    const action = await dispatch(startOrder(phone))

    // Si l’action s’est bien passée, on passe à la page de commande
    if (startOrder.fulfilled.match(action)) {
      navigate('/order')
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Welcome !</h2>
      <p>Enter any phone number (10 digits)</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="tel"
            className="form-control"
            placeholder="06 12 34 56 78"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Start order'}
        </button>
      </form>

      {/* Si erreur, on l’affiche dans une alerte */}
      {error && <div className="alert alert-danger mt-3">Error : {error}</div>}
    </div>
  )
}
