import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiMail, FiPhone, FiClock, FiFeather, FiRefreshCw, FiTruck, FiHeart } from 'react-icons/fi';
import { collections } from '../data/categories';
import { MEN_PHOTOS, WOMEN_PHOTOS, img } from '../data/images';
const Page = ({ title, children }) => <div className="container section narrow"><h1 className="page-title">{title}</h1>{children}</div>;

const values = [
  [FiFeather, 'Honest fabrics', 'Linen, cotton and silk blends sourced for how they feel, not just how they look.'],
  [FiHeart, 'Made to last', 'Considered cuts and finishing so pieces stay in rotation for years, not seasons.'],
  [FiTruck, 'Fast, tracked delivery', 'Dispatched within 24 hours, with real-time tracking on every order.'],
  [FiRefreshCw, 'Easy 14-day returns', "Didn't work out? Free returns and exchanges, no questions asked."],
];

export const About = () => (
  <div>
    <div className="about-hero">
      <img src={img(WOMEN_PHOTOS[0], 1600, 700)} alt="Vastraa clothing" />
      <div className="about-hero-copy container"><p className="label">Our story</p><h1>Style that speaks for you</h1></div>
    </div>
    <div className="container section narrow center-text">
      <p className="lead">Vastraa makes clothing for everyday life: honest fabrics, considered cuts and colours that
        work together. What started as a small edit of wardrobe essentials has grown into a full line for men and
        women, but the idea hasn't changed — clothes should feel as good as they look.</p>
    </div>
    <div className="container section split">
      <img src={img(MEN_PHOTOS[1], 700, 560)} alt="Vastraa menswear" className="about-img" />
      <div>
        <p className="label">Since day one</p>
        <h2>Designed in-studio, worn every day</h2>
        <p className="muted">Every Vastraa piece goes through the same test: would we wear it on a Tuesday, a wedding
          and a weekend hike? Our design team works fabric-first, picking natural fibres and colourways that mix and
          match across the whole wardrobe, then fits them on real bodies before anything goes into production.</p>
      </div>
    </div>
    <div className="container section split reverse">
      <img src={img(MEN_PHOTOS[9], 700, 560)} alt="Vastraa ethnic and festive wear" className="about-img" />
      <div>
        <p className="label">Rooted in craft</p>
        <h2>From everyday basics to festive wear</h2>
        <p className="muted">Alongside shirts, tees and denim for daily wear, our Ethnic Wear edit is hand-finished
          with artisans we've worked with for years — Chanderi silk, block prints and Nehru jackets built for
          celebrations that matter.</p>
      </div>
    </div>
    <div className="container section">
      <div className="grid g4 values">
        {values.map(([Icon, title, text]) => (
          <div className="box value" key={title}><Icon size={22} /><h3>{title}</h3><p className="muted small">{text}</p></div>
        ))}
      </div>
    </div>
    <div className="promo"><div className="container"><p className="label" style={{ color: '#fff' }}>Shop the edit</p>
      <h2>Discover pieces made for how you actually live</h2>
      <Link className="btn btn-accent" to="/shop">Shop all products</Link></div></div>
  </div>
);

const details = [
  [FiMail, 'Email us', 'care@vastraa.example', 'mailto:care@vastraa.example'],
  [FiPhone, 'Call us', '+91 98765 43210', 'tel:+919876543210'],
  [FiMapPin, 'Visit us', '4th Floor, Textile House, Ring Road, Surat, Gujarat 395002', null],
  [FiClock, 'Hours', 'Mon–Sat, 10:00 AM – 7:00 PM IST', null],
];

export const Contact = () => {
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <div>
      <div className="about-hero contact-hero">
        <img src={img(WOMEN_PHOTOS[1], 1600, 500)} alt="Contact Vastraa" />
        <div className="about-hero-copy container"><p className="label">We'd love to hear from you</p><h1>Contact us</h1></div>
      </div>
      <div className="container section two contact-grid">
        <div>
          <h2>Send us a message</h2>
          <p className="muted">Questions on orders, shipping or returns? Fill this in and we'll reply within a day.</p>
          {sent ? (
            <div className="box"><b>Thanks — message sent!</b><p className="muted">Our team will get back to you at the email you shared, usually within one business day.</p></div>
          ) : (
            <form className="box fields" onSubmit={submit}>
              <input required placeholder="Your name" />
              <input required type="email" placeholder="Email address" />
              <input placeholder="Order number (optional)" />
              <textarea required placeholder="How can we help?" rows="5" style={{ gridColumn: '1/-1', border: '1px solid var(--line)', borderRadius: 6, padding: '9px 12px', font: 'inherit', resize: 'vertical' }} />
              <button className="btn btn-dark" style={{ gridColumn: '1/-1' }} type="submit">Send message</button>
            </form>
          )}
        </div>
        <div className="contact-cards">
          {details.map(([Icon, title, text, href]) => (
            <div className="box contact-card" key={title}>
              <Icon size={20} />
              <div><b>{title}</b>{href ? <a className="link block" style={{ marginTop: 4 }} href={href}>{text}</a> : <p className="muted small">{text}</p>}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export const NotFound = () => <div className="container section empty"><h2>Page not found</h2><Link className="btn btn-dark" to="/">Back home</Link></div>;
export const Collections = () => <div className="container section"><h1 className="page-title">Collections</h1><div className="col-grid">{collections.map((c) => <Link key={c.name} to="/shop" className="col"><img src={c.image} alt={c.name} /><span>{c.name}</span></Link>)}</div></div>;
const orders = [['VS104233', '12 Sep 2026', 'Linen Wrap Dress × 1', 2499, 'Delivered'], ['VS104871', '20 Sep 2026', 'Oxford Button-Down × 2', 3598, 'Shipped'], ['VS105002', '23 Sep 2026', 'Leather Tote Bag × 1', 3999, 'Processing']];
export const Orders = () => <Page title="Orders">{orders.map(([id, d, it, t, s]) => <div className="box between" key={id}><div><b>{id}</b> <span className="muted small">{d}</span><p>{it}</p></div><div><b>₹{t.toLocaleString('en-IN')}</b><p className={`status ${s}`}>{s}</p></div></div>)}</Page>;
export const Profile = () => <Page title="My account"><div className="grid g3">{[['Personal information', '/profile'], ['My orders', '/orders'], ['Wishlist', '/wishlist'], ['Saved addresses', '/profile'], ['Payment methods', '/profile'], ['Log out', '/login']].map(([t, to]) => <Link key={t} to={to} className="box">{t}</Link>)}</div></Page>;
