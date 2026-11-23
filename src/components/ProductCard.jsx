import { Link } from 'react-router-dom';
import { FiHeart, FiEye, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { fmt } from '../data/products';
export default function ProductCard({ product: p, onQuickView, list }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const firstSize = p.sizes.find((s) => !p.unavailable.includes(s));
  return (
    <article className={`card ${list ? 'card-list' : ''}`}>
      <div className="card-img">
        <Link to={`/product/${p.id}`}><img src={p.images[0]} alt={p.name} loading="lazy" /></Link>
        {p.isSale ? <span className="badge">-{p.discount}%</span> : p.isNew && <span className="badge dark">New</span>}
        <button className={`wish ${has(p.id) ? 'on' : ''}`} aria-label="Toggle wishlist" onClick={() => toggle(p.id)}><FiHeart /></button>
        <div className="card-actions">
          <button className="btn btn-light" onClick={() => onQuickView?.(p)}><FiEye /> Quick view</button>
          <button className="btn btn-dark" disabled={!p.inStock} onClick={() => add(p, firstSize)}>{p.inStock ? 'Add to cart' : 'Sold out'}</button>
        </div>
      </div>
      <div className="card-body">
        <p className="muted small">{p.brand} · {p.category}</p>
        <Link to={`/product/${p.id}`}><h3>{p.name}</h3></Link>
        <p className="small"><FiStar className="star" /> {p.rating} <span className="muted">({p.reviews})</span></p>
        <p><b>{fmt(p.price)}</b> {p.isSale && <s className="muted small">{fmt(p.originalPrice)}</s>}</p>
        <div className="swatches">{p.colors.map((c) => <i key={c.name} title={c.name} style={{ background: c.hex }} />)}</div>
      </div>
    </article>
  );
}
