import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiHeart, FiShare2, FiTruck, FiRefreshCw, FiLock } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getProduct, products, fmt } from '../data/products';
export default function ProductDetails() {
  const { id } = useParams(); const p = getProduct(id); const nav = useNavigate();
  const { add, notify } = useCart(); const { has, toggle } = useWishlist();
  const [main, setMain] = useState(0); const [size, setSize] = useState(''); const [color, setColor] = useState(0); const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(null); const [reviews, setReviews] = useState([['Aarav S.', 5, 'Fabric feels great and the fit is spot on.'], ['Meera K.', 4, 'Lovely colour. Runs slightly small, so size up.']]);
  const [draft, setDraft] = useState('');
  if (!p) return <div className="container section empty"><h2>Product not found</h2><Link className="btn btn-dark" to="/shop">Back to shop</Link></div>;
  const need = () => { if (!size) { notify('Select a size first'); return false; } return true; };
  const avg = ((p.rating * p.reviews + reviews.reduce((s, r) => s + r[1], 0)) / (p.reviews + reviews.length)).toFixed(1);
  return (
    <div className="container section">
      <p className="muted small"><Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {p.name}</p>
      <div className="pdp">
        <div className="gallery"><div className="thumbs">{p.images.map((s, i) => <img key={s} src={s} alt={`${p.name} view ${i + 1}`} className={i === main ? 'on' : ''} onClick={() => setMain(i)} />)}</div>
          <div className="zoom" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setZoom(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`); }} onMouseLeave={() => setZoom(null)}>
            <img src={p.images[main]} alt={p.name} style={zoom ? { transformOrigin: zoom, transform: 'scale(1.8)' } : null} /></div></div>
        <div className="info"><h1>{p.name}</h1><p className="muted">★ {avg} · {p.reviews + reviews.length} reviews</p>
          <p className="price">{fmt(p.price)} {p.isSale && <><s className="muted">{fmt(p.originalPrice)}</s> <span className="badge inline">{p.discount}% off</span></>}</p><p>{p.description}</p>
          <h4>Colour: {p.colors[color].name}</h4><div className="swatches lg">{p.colors.map((c, i) => <i key={c.name} title={c.name} className={i === color ? 'on' : ''} style={{ background: c.hex }} onClick={() => setColor(i)} />)}</div>
          <h4>Size <a className="link" href="#!" onClick={() => notify('XS–XXL: chest 32–46 in')}>Size guide</a></h4>
          <div className="row wrap">{p.sizes.map((s) => <button key={s} disabled={p.unavailable.includes(s)} className={`size ${s === size ? 'on' : ''}`} onClick={() => setSize(s)}>{s}</button>)}</div>
          <div className="row"><div className="qty"><button onClick={() => setQty(Math.max(1, qty - 1))}>−</button><span>{qty}</span><button onClick={() => setQty(qty + 1)}>+</button></div>
            <button className="btn btn-dark" disabled={!p.inStock} onClick={() => need() && add(p, size, qty)}>{p.inStock ? 'Add to cart' : 'Out of stock'}</button>
            <button className="btn btn-accent" disabled={!p.inStock} onClick={() => { if (need()) { add(p, size, qty); nav('/checkout'); } }}>Buy now</button>
            <button className="icon-btn bordered" aria-label="Wishlist" onClick={() => toggle(p.id)}><FiHeart fill={has(p.id) ? 'currentColor' : 'none'} /></button>
            <button className="icon-btn bordered" aria-label="Share" onClick={() => { navigator.clipboard?.writeText(window.location.href); notify('Link copied'); }}><FiShare2 /></button></div>
          <ul className="assure"><li><FiTruck /> Free delivery over ₹1,999 · 3–5 days</li><li><FiRefreshCw /> 15-day easy returns</li><li><FiLock /> Secure payments</li></ul>
          <table className="specs"><tbody>{[['Fabric', p.fabric], ['Fit', p.fit], ['Pattern', p.pattern], ['Occasion', p.occasion], ['Wash care', p.washCare]].map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}</tbody></table></div>
      </div>
      <section className="section"><h2>Reviews</h2>
        {reviews.map(([n, r, t], i) => <div className="review" key={i}><b>{n}</b> <span className="star">{'★'.repeat(r)}</span><p>{t}</p></div>)}
        <form className="row" onSubmit={(e) => { e.preventDefault(); if (draft.trim()) { setReviews([['You', 5, draft], ...reviews]); setDraft(''); notify('Review added'); } }}>
          <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write a review" aria-label="Write a review" /><button className="btn btn-outline">Submit</button></form></section>
      <section className="section"><h2>You may also like</h2><div className="grid">{products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4).map((x) => <ProductCard key={x.id} product={x} />)}</div></section>
    </div>
  );
}
