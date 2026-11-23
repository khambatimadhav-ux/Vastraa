import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { products, fmt } from '../data/products';
export default function Wishlist() {
  const { ids, toggle } = useWishlist(); const { add } = useCart();
  const list = products.filter((p) => ids.includes(p.id));
  if (!list.length) return <div className="container section empty"><h2>Your wishlist is empty</h2><p className="muted">Tap the heart on any product to save it here.</p><Link className="btn btn-dark" to="/shop">Explore products</Link></div>;
  return (
    <div className="container section"><h1 className="page-title">Wishlist</h1>
      {list.map((p) => <div className="line" key={p.id}><img src={p.images[0]} alt={p.name} /><div><Link to={`/product/${p.id}`}><b>{p.name}</b></Link><p className="muted small">{fmt(p.price)}</p></div>
        <div className="row"><button className="btn btn-dark" onClick={() => { add(p, p.sizes.find((s) => !p.unavailable.includes(s))); toggle(p.id); }}>Move to cart</button><button className="link" onClick={() => toggle(p.id)}>Remove</button></div></div>)}</div>
  );
}
