import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import ProductSlider from '../components/ProductSlider';
import QuickView from '../components/QuickView';
import { categories, collections } from '../data/categories';
import { products } from '../data/products';
export default function Home() {
  const [qv, setQv] = useState(null);
  const [sort, setSort] = useState('rating');
  const best = products.filter((p) => p.isBestSeller).sort((a, b) => sort === 'rating' ? b.rating - a.rating : sort === 'low' ? a.price - b.price : b.price - a.price).slice(0, 8);
  return (
    <>
      <Hero />
      <section className="container section"><h2>Shop by category</h2>
        <div className="cat-grid">{categories.map((c) => <Link key={c.slug} to={c.slug === 'women' || c.slug === 'men' ? `/${c.slug}` : `/category/${c.slug}`} className="cat"><img src={c.image} alt={c.name} loading="lazy" /><span>{c.name}</span></Link>)}</div></section>
      <section className="container section"><h2>Trending now</h2><div className="grid">{products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} onQuickView={setQv} />)}</div></section>
      <section className="container section"><div className="between"><h2>New arrivals</h2><Link className="btn btn-outline" to="/new-arrivals">View all</Link></div><ProductSlider items={products.filter((p) => p.isNew)} onQuickView={setQv} /></section>
      <section className="promo"><div className="container"><p className="label" style={{ color: '#fff' }}>Season sale</p><h2>Up to 50% off. Refresh your wardrobe.</h2><p>Explore the latest collection and find styles for every occasion.</p><Link className="btn btn-accent" to="/shop?sale=1">Shop sale</Link>
        <div className="stats">
          <div className="stat"><b>25k+</b><span>Happy customers</span></div>
          <div className="stat"><b>300+</b><span>Curated styles</span></div>
          <div className="stat"><b>4.7★</b><span>Average rating</span></div>
          <div className="stat"><b>24h</b><span>Dispatch time</span></div>
        </div>
      </div></section>
      <section className="container section"><div className="between"><h2>Best sellers</h2>
        <select aria-label="Sort best sellers" value={sort} onChange={(e) => setSort(e.target.value)}><option value="rating">Top rated</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div>
        <div className="grid">{best.map((p) => <ProductCard key={p.id} product={p} onQuickView={setQv} />)}</div></section>
      <section className="container section"><h2>Collections</h2><div className="col-grid">{collections.map((c) => <Link key={c.name} to="/shop" className="col"><img src={c.image} alt={c.name} loading="lazy" /><span>{c.name}</span></Link>)}</div></section>
      {qv && <QuickView product={qv} onClose={() => setQv(null)} />}
    </>
  );
}
