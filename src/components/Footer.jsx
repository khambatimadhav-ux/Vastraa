import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaPinterestP, FaXTwitter } from 'react-icons/fa6';
import { FiTruck, FiRefreshCw, FiShield, FiHeadphones } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import Logo from './Logo';
const cols = [['Shop', [['Women', '/women'], ['Men', '/men'], ['New Arrivals', '/new-arrivals'], ['Best Sellers', '/shop?sort=popular'], ['Sale', '/shop?sale=1']]], ['Customer care', [['Contact us', '/contact'], ['Shipping', '/contact'], ['Returns', '/contact'], ['FAQs', '/contact'], ['Size guide', '/contact']]], ['About', [['About Vastraa', '/about'], ['Our story', '/about'], ['Careers', '/about']]]];
const trust = [[FiTruck, 'Free shipping', 'On orders over ₹1,999'], [FiRefreshCw, 'Easy returns', '14-day return window'], [FiShield, 'Secure payments', '100% protected checkout'], [FiHeadphones, 'Dedicated support', 'Here Mon–Sat, 10–7']];
export default function Footer() {
  const { notify } = useCart();
  return (
    <footer className="footer">
      <div className="container trust-row">
        {trust.map(([Icon, t, s]) => <div className="trust" key={t}><Icon size={20} /><div><b>{t}</b><span>{s}</span></div></div>)}
      </div>
      <div className="container foot-brand">
        <Link to="/"><Logo withTag size={38} /></Link>
        <p className="muted small">Honest fabrics, considered cuts. Clothing for men and women that feels as good as it looks.</p>
        <div className="row social">{[FaInstagram, FaFacebookF, FaPinterestP, FaXTwitter].map((I, k) => <a key={k} href="#!" aria-label="Social link"><I /></a>)}</div>
      </div>
      <div className="container foot-grid">
        {cols.map(([t, l]) => <div key={t}><h4>{t}</h4>{l.map(([n, to]) => <Link key={n} to={to}>{n}</Link>)}</div>)}
        <div><h4>Newsletter</h4><p>Get 10% off your first order.</p>
          <form className="row" onSubmit={(e) => { e.preventDefault(); notify('Subscribed. Check your inbox for 10% off'); e.target.reset(); }}><input type="email" required placeholder="Email address" aria-label="Email" /><button className="btn btn-accent">Subscribe</button></form>
        </div>
      </div>
      <p className="copy">© {new Date().getFullYear()} Vastraa. Style that speaks for you.</p>
    </footer>
  );
}
