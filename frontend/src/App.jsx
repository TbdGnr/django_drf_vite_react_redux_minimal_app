// App.jsx : gère les pages de l’app via React Router

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PhoneEntry from './components/PhoneEntry.jsx'
import OrderPage from './components/OrderPage.jsx'     // on le fera après
import ConfirmationPage from './components/ConfirmationPage.jsx' // on le fera après

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Page d'accueil : saisie du téléphone */}
        <Route path="/" element={<PhoneEntry />} />

        {/* Page commande : choix des produits */}
        <Route path="/order" element={<OrderPage />} />

        {/* Page de confirmation */}
        <Route path="/confirm" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  )
}
