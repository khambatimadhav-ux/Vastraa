import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { fmt } from '../data/products';
export default function QuickView({ product: p, onClose }) {
  const { add } = useCart();
  const [size, setSize] = useState(p.sizes.find((s) => !p.unavailable.includes(s)));
  const [qty, setQty] = useState(1);
  return (
    <div className="modal-wrap" onClick={onClose}>
      <div className="modal" role="dialog" aria-label={p.name} onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn modal-x" aria-label="Close" onClick={onClose}><FiX /></button>
        <img src={p.images[0]} alt={p.name} />
        <div><h2>{p.name}</h2><p className="muted small">★ {p.rating} ({p.reviews} reviews)</p><p><b>{fmt(p.price)}</b> {p.isSale && <s className="muted">{fmt(p.originalPrice)}</s>}</p><p>{p.description}</p>
          <div className="row wrap">{p.sizes.map((s) => <button key={s} disabled={p.unavailable.includes(s)} className={`size ${s === size ? 'on' : ''}`} onClick={() => setSize(s)}>{s}</button>)}</div>
          <div className="row"><div className="qty"><button onClick={() => setQty(Math.max(1, qty - 1))}>−</button><span>{qty}</span><button onClick={() => setQty(qty + 1)}>+</button></div>
            <button className="btn btn-dark" onClick={() => { add(p, size, qty); onClose(); }}>Add to cart</button></div>
          <Link to={`/product/${p.id}`} onClick={onClose} className="link">View full details</Link></div>
      </div>
    </div>
  );
}
