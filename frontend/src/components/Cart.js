import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const totalAmount = cartItems.length * 15; // $15 per book

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 && <p>No items in cart.</p>}
      {cartItems.map((book, index) => (
        <div key={index} className="cart-item">
          <h4>{book.title}</h4>
          <p>By: {book.authors.join(', ')}</p>
          <p>Price: $15.00</p>
          <button onClick={() => removeFromCart(book.id)}>Remove</button>
        </div>
      ))}
      {cartItems.length > 0 && (
        <div>
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
