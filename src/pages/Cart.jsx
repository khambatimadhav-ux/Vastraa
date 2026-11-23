import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fmt } from '../data/products';
export function Summary() {
  const { subtotal, discount, delivery, total, coupon, setCoupon, notify } = useCart();
  const [c, setC] = useState(coupon);
  return (
    <div className="box"><h3>Order summary</h3>
      <form className="row" onSubmit={(e) => { e.preventDefault(); const ok = c.toUpperCase() === 'VASTRAA10'; setCoupon(ok ? 'VASTRAA10' : ''); notify(ok ? '10% coupon applied' : 'Invalid coupon. Try VASTRAA10'); }}><input value={c} onChange={(e) => setC(e.target.value)} placeholder="Coupon code" aria-label="Coupon" /><button className="btn btn-outline">Apply</button></form>
      <p className="between"><span>Subtotal</span><span>{fmt(subtotal)}</span></p><p className="between"><span>Discount</span><span>-{fmt(discount)}</span></p>
      <p className="between"><span>Delivery</span><span>{delivery ? fmt(delivery) : 'Free'}</span></p><p className="between total"><b>Total</b><b>{fmt(total)}</b></p></div>
  );
}
export default function Cart() {
  const { items, setQty, remove, clear } = useCart();
  if (!items.length) return <div className="container section empty"><h2>Your cart is empty</h2><Link className="btn btn-dark" to="/shop">Start shopping</Link></div>;
  return (
    <div className="container section"><h1 className="page-title">Cart</h1>
      <div className="two"><div>{items.map((i) => <div className="line" key={i.key}><img src={i.image} alt={i.name} /><div><b>{i.name}</b><p className="muted small">Size {i.size} · {fmt(i.price)}</p>
        <div className="qty"><button onClick={() => setQty(i.key, i.qty - 1)}>−</button><span>{i.qty}</span><button onClick={() => setQty(i.key, i.qty + 1)}>+</button></div></div><button className="link" onClick={() => remove(i.key)}>Remove</button></div>)}
        <button className="link" onClick={clear}>Remove all</button></div>
        <div><Summary /><Link className="btn btn-dark block" to="/checkout">Proceed to checkout</Link></div></div></div>
  );
}
