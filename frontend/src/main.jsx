import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 🧠 On importe Redux
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

// 🧠 Bootstrap pour le style
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* On donne le store Redux à toute l'application */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
