import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/productsSlice'
import { addItem, removeItem } from '../redux/orderSlice'
import { useNavigate } from 'react-router-dom'

export default function OrderPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // On récupère les produits et la commande depuis Redux
  const productsState = useSelector((state) => state.products)
  const orderState = useSelector((state) => state.order)

  const { items: products, loading: loadingProducts, error: errorProducts } = productsState
  const { orderId, items: cartItems, total, phone } = orderState

  // Si on arrive sur cette page sans commande : redirection
  useEffect(() => {
    if (!orderId) navigate('/')
    if (products.length === 0 && !loadingProducts) {
      dispatch(fetchProducts())
    }
  }, [orderId, products, loadingProducts, dispatch, navigate])

  const handleAdd = (productId) => {
    dispatch(addItem({ orderId, productId }))
  }

  const handleRemove = (productId) => {
    dispatch(removeItem({ orderId, productId }))
  }

  const getQuantity = (productId) => {
    const item = cartItems.find((it) => it.product.id === productId)
    return item ? item.quantity : 0
  }

  return (
    <div className="container mt-4">
      <h2>Hello, {phone} !</h2>
      <p>Select your products :</p>

      {loadingProducts ? (
        <p>Loadind products...</p>
      ) : errorProducts ? (
        <div className="alert alert-danger">Error : {errorProducts}</div>
      ) : (
        <div className="row">
          {products.map((product) => {
            const quantity = getQuantity(product.id)
            return (
              <div key={product.id} className="col-md-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{Number(product.price).toFixed(2)} €</p>

                    {quantity > 0 ? (
                      <div className="input-group">
                        <button className="btn btn-secondary" onClick={() => handleRemove(product.id)}>-</button>
                        <input type="text" value={quantity} readOnly className="form-control text-center" />
                        <button className="btn btn-secondary" onClick={() => handleAdd(product.id)}>+</button>
                      </div>
                    ) : (
                      <button className="btn btn-primary" onClick={() => handleAdd(product.id)}>
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Récapitulatif du panier */}
      <div className="mt-5">
        <h4>My order</h4>
        {cartItems.length === 0 ? (
          <p>No product</p>
        ) : (
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li key={item.product.id} className="list-group-item d-flex justify-content-between">
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <strong>{(item.product.price * item.quantity).toFixed(2)} €</strong>
              </li>
            ))}
          </ul>
        )}
        <h5>Total : {total.toFixed(2)} €</h5>
        <button
          className="btn btn-success mt-2"
          onClick={() => navigate('/confirm')}
          disabled={cartItems.length === 0}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
