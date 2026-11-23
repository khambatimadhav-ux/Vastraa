import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { fmt } from '../data/products';
export default function CartDrawer() {
  const { open, setOpen, items, setQty, remove, clear, subtotal } = useCart();
  return (
    <>
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-head"><h3>Your cart</h3><button className="icon-btn" aria-label="Close cart" onClick={() => setOpen(false)}><FiX /></button></div>
        <div className="drawer-body">
          {!items.length && <p className="muted">Your cart is empty. <Link className="link" to="/shop" onClick={() => setOpen(false)}>Browse the shop</Link></p>}
          {items.map((i) => (
            <div className="line" key={i.key}><img src={i.image} alt={i.name} />
              <div><b>{i.name}</b><p className="muted small">Size {i.size} · {fmt(i.price)}</p>
                <div className="qty"><button onClick={() => setQty(i.key, i.qty - 1)}>−</button><span>{i.qty}</span><button onClick={() => setQty(i.key, i.qty + 1)}>+</button></div></div>
              <button className="link" onClick={() => remove(i.key)}>Remove</button></div>
          ))}
        </div>
        {items.length > 0 && <div className="drawer-foot"><p className="between"><span>Subtotal</span><b>{fmt(subtotal)}</b></p>
          <Link className="btn btn-dark block" to="/checkout" onClick={() => setOpen(false)}>Checkout</Link>
          <div className="between"><Link className="link" to="/cart" onClick={() => setOpen(false)}>View cart</Link><button className="link" onClick={clear}>Remove all</button></div></div>}
      </aside>
    </>
  );
}
