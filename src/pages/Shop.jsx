import { useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FiGrid, FiList, FiSliders } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';
import { products } from '../data/products';
const toggle = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
const cats = ['Dresses', 'Shirts', 'Tops', 'Jeans', 'Ethnic Wear', 'Accessories'];
const colors = [...new Set(products.flatMap((p) => p.colors.map((c) => c.name)))];
export default function Shop({ preset }) {
  const { category } = useParams();
  const [sp] = useSearchParams();
  const [q, setQ] = useState(sp.get('q') || '');
  const [cs, setCs] = useState([]); const [sizes, setSizes] = useState([]); const [cols, setCols] = useState([]);
  const [max, setMax] = useState(7000); const [rating, setRating] = useState(0); const [stock, setStock] = useState('all');
  const [sort, setSort] = useState(sp.get('sort') || 'featured'); const [list, setList] = useState(false);
  const [more, setMore] = useState(9); const [open, setOpen] = useState(false); const [qv, setQv] = useState(null);
  const title = { women: 'Women', men: 'Men', new: 'New arrivals' }[preset] || (category ? category.replace('-', ' ') : 'Shop all');
  const shown = useMemo(() => {
    let r = products.filter((p) =>
      (!q || p.name.toLowerCase().includes(q.toLowerCase())) &&
      (!cs.length || cs.includes(p.category)) && (!sizes.length || sizes.some((s) => p.sizes.includes(s))) &&
      (!cols.length || p.colors.some((c) => cols.includes(c.name))) && p.price <= max && p.rating >= rating &&
      (stock === 'all' || (stock === 'in') === p.inStock) &&
      (preset !== 'women' || p.gender === 'Women') && (preset !== 'men' || p.gender === 'Men') && (preset !== 'new' || p.isNew) &&
      (!category || p.category.toLowerCase().replace(' ', '-') === category) && (!sp.get('sale') || p.isSale));
    const s = { low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, rating: (a, b) => b.rating - a.rating, popular: (a, b) => b.reviews - a.reviews, newest: (a, b) => b.id - a.id }[sort];
    return s ? [...r].sort(s) : r;
  }, [q, cs, sizes, cols, max, rating, stock, sort, preset, category, sp]);
  return (
    <div className="container section">
      <h1 className="page-title">{title}</h1>
      <div className="between bar"><span className="muted">{shown.length} products</span>
        <div className="row"><button className="btn btn-outline only-mobile" onClick={() => setOpen(true)}><FiSliders /> Filters</button>
          <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="newest">Newest</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="rating">Best rating</option><option value="popular">Most popular</option></select>
          <button className="icon-btn hide-mobile" aria-label="Grid view" onClick={() => setList(false)}><FiGrid /></button><button className="icon-btn hide-mobile" aria-label="List view" onClick={() => setList(true)}><FiList /></button></div></div>
      <div className="shop">
        {open && <div className="scrim" onClick={() => setOpen(false)} />}
        <aside className={`filters ${open ? 'open' : ''}`}>
          <input placeholder="Search products" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" />
          <h4>Category</h4>{cats.map((c) => <label key={c}><input type="checkbox" checked={cs.includes(c)} onChange={() => setCs(toggle(cs, c))} /> {c}</label>)}
          <h4>Size</h4><div className="row wrap">{['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => <button key={s} className={`size ${sizes.includes(s) ? 'on' : ''}`} onClick={() => setSizes(toggle(sizes, s))}>{s}</button>)}</div>
          <h4>Price up to ₹{max}</h4><input type="range" min="500" max="7000" step="100" value={max} onChange={(e) => setMax(+e.target.value)} />
          <h4>Colour</h4><div className="row wrap">{colors.map((c) => <button key={c} className={`chip ${cols.includes(c) ? 'on' : ''}`} onClick={() => setCols(toggle(cols, c))}>{c}</button>)}</div>
          <h4>Rating</h4><select aria-label="Minimum rating" value={rating} onChange={(e) => setRating(+e.target.value)}><option value="0">Any</option><option value="4">4★ & up</option><option value="4.5">4.5★ & up</option></select>
          <h4>Availability</h4><select aria-label="Availability" value={stock} onChange={(e) => setStock(e.target.value)}><option value="all">All</option><option value="in">In stock</option><option value="out">Out of stock</option></select>
          <button className="btn btn-dark only-mobile" onClick={() => setOpen(false)}>Show {shown.length} products</button>
        </aside>
        <div>{!shown.length ? <div className="empty"><h3>No products match</h3><p className="muted">Try removing a filter or widening the price range.</p></div> :
          <div className={list ? 'list' : 'grid g3'}>{shown.slice(0, more).map((p) => <ProductCard key={p.id} product={p} list={list} onQuickView={setQv} />)}</div>}
          {more < shown.length && <div className="center"><button className="btn btn-outline" onClick={() => setMore(more + 9)}>Load more</button></div>}</div>
      </div>
      {qv && <QuickView product={qv} onClose={() => setQv(null)} />}
    </div>
  );
}
