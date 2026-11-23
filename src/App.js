import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header'; import Footer from './components/Footer'; import CartDrawer from './components/CartDrawer';
import Home from './pages/Home'; import Shop from './pages/Shop'; import ProductDetails from './pages/ProductDetails'; import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist'; import Checkout from './pages/Checkout'; import Auth from './pages/Auth';
import { About, Contact, NotFound, Collections, Orders, Profile } from './pages/Info';
function Shell() {
  const { toast } = useCart(); const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return (
    <>
      <Header /><CartDrawer />
      <main><Routes>
        <Route path="/" element={<Home />} /><Route path="/shop" element={<Shop />} />
        <Route path="/women" element={<Shop preset="women" />} /><Route path="/men" element={<Shop preset="men" />} /><Route path="/new-arrivals" element={<Shop preset="new" />} />
        <Route path="/collections" element={<Collections />} /><Route path="/product/:id" element={<ProductDetails />} /><Route path="/category/:category" element={<Shop />} />
        <Route path="/cart" element={<Cart />} /><Route path="/wishlist" element={<Wishlist />} /><Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Auth />} /><Route path="/register" element={<Auth register />} /><Route path="/profile" element={<Profile />} /><Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} />
      </Routes></main>
      <Footer />{toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}
export default function App() { return <CartProvider><WishlistProvider><Shell /></WishlistProvider></CartProvider>; }
