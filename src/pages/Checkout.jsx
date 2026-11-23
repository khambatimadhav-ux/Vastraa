import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Summary } from './Cart';
import { useCart } from '../context/CartContext';
export default function Checkout() {
  const { items, clear, total } = useCart(); const [done, setDone] = useState(null); const [pay, setPay] = useState('Cash on Delivery');
  if (done) return <div className="container section empty"><h2>Order placed</h2><p>Your order <b>{done}</b> is confirmed. We will email you the tracking details.</p><Link className="btn btn-dark" to="/orders">View orders</Link></div>;
  if (!items.length) return <div className="container section empty"><h2>Nothing to check out</h2><Link className="btn btn-dark" to="/shop">Browse the shop</Link></div>;
  return (
    <div className="container section"><h1 className="page-title">Checkout</h1>
      <form className="two" onSubmit={(e) => { e.preventDefault(); setDone('VS' + Date.now().toString().slice(-6)); clear(); }}>
        <div className="box"><h3>Delivery address</h3><div className="fields">{['Name', 'Phone', 'Address', 'City', 'State', 'Pincode'].map((f) => <input key={f} required placeholder={f} aria-label={f} />)}</div>
          <h3>Payment method</h3>{['Cash on Delivery', 'UPI', 'Card', 'Net Banking'].map((m) => <label key={m}><input type="radio" name="pay" checked={pay === m} onChange={() => setPay(m)} /> {m}</label>)}</div>
        <div><Summary /><button className="btn btn-dark block">Place order · ₹{total.toLocaleString('en-IN')}</button></div></form></div>
  );
}
