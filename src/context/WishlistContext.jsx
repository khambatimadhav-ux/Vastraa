import { createContext, useContext, useEffect, useState } from 'react';
import { useCart } from './CartContext';
const Ctx = createContext();
export const useWishlist = () => useContext(Ctx);
export function WishlistProvider({ children }) {
  const { notify } = useCart();
  const [ids, setIds] = useState(() => { try { return JSON.parse(localStorage.getItem('vastraa-wish')) || []; } catch { return []; } });
  useEffect(() => localStorage.setItem('vastraa-wish', JSON.stringify(ids)), [ids]);
  const toggle = (id) => { notify(ids.includes(id) ? 'Removed from wishlist' : 'Saved to wishlist'); setIds((c) => c.includes(id) ? c.filter((x) => x !== id) : [...c, id]); };
  return <Ctx.Provider value={{ ids, toggle, has: (id) => ids.includes(id) }}>{children}</Ctx.Provider>;
}
