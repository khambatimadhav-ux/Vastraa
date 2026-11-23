import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products, fmt } from '../data/products';
import Logo from './Logo';
const links = [['/', 'Home'], ['/shop', 'Shop'], ['/women', 'Women'], ['/men', 'Men'], ['/new-arrivals', 'New Arrivals'], ['/collections', 'Collections'], ['/about', 'About'], ['/contact', 'Contact']];
const perks = [[FiTruck, 'Free shipping over ₹1,999'], [FiRefreshCw, 'Easy 14-day returns'], [FiShield, '100% secure payments']];
export default function Header() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState('');
  const { count, setOpen } = useCart();
  const { ids } = useWishlist();
  const nav = useNavigate();
  const hits = q.trim() ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5) : [];
  const close = () => { setSearch(false); setQ(''); };
  return (
    <header className="header">
      <div className="announce"><div className="container announce-in">
        {perks.map(([Icon, t]) => <span key={t}><Icon size={13} /> {t}</span>)}
      </div></div>
      <div className="container header-in">
        <button className="icon-btn only-mobile" aria-label="Open menu" onClick={() => setMenu(true)}><FiMenu /></button>
        <Link to="/" className="logo"><Logo withTag /></Link>
        <nav className={`nav ${menu ? 'open' : ''}`}>
          <button className="icon-btn only-mobile nav-close" aria-label="Close menu" onClick={() => setMenu(false)}><FiX /></button>
          {links.map(([to, t]) => <NavLink key={to} to={to} end onClick={() => setMenu(false)}>{t}</NavLink>)}
        </nav>
        <div className="header-actions">
          <button className="icon-btn" aria-label="Search" onClick={() => setSearch(true)}><FiSearch /></button>
          <Link className="icon-btn hide-mobile" aria-label="Wishlist" to="/wishlist"><FiHeart />{ids.length > 0 && <span className="dot">{ids.length}</span>}</Link>
          <button className="icon-btn" aria-label="Cart" onClick={() => setOpen(true)}><FiShoppingBag />{count > 0 && <span className="dot">{count}</span>}</button>
          <Link className="icon-btn hide-mobile" aria-label="Account" to="/login"><FiUser /></Link>
        </div>
      </div>
      {menu && <div className="scrim" onClick={() => setMenu(false)} />}
      {search && (
        <div className="search-overlay">
          <div className="container">
            <div className="search-bar"><FiSearch /><input autoFocus value={q} placeholder="Search dresses, shirts, kurtas" onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && q.trim()) { nav(`/shop?q=${encodeURIComponent(q)}`); close(); } }} />
              <button className="icon-btn" aria-label="Close search" onClick={close}><FiX /></button></div>
            {!q && <p className="muted">Popular: {['Linen', 'Kurta', 'Denim', 'Shirt'].map((t) => <button key={t} className="chip" onClick={() => setQ(t)}>{t}</button>)}</p>}
            {hits.map((p) => <Link key={p.id} to={`/product/${p.id}`} className="hit" onClick={close}><img src={p.images[0]} alt={p.name} /><span>{p.name}</span><b>{fmt(p.price)}</b></Link>)}
            {q && !hits.length && <p className="muted">No products match “{q}”. Try a different word.</p>}
          </div>
        </div>
      )}
    </header>
  );
}
