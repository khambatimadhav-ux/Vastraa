import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
const Ctx = createContext();
export const useCart = () => useContext(Ctx);
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => { try { return JSON.parse(localStorage.getItem('vastraa-cart')) || []; } catch { return []; } });
  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [toast, setToast] = useState('');
  useEffect(() => localStorage.setItem('vastraa-cart', JSON.stringify(items)), [items]);
  const notify = useCallback((m) => { setToast(m); setTimeout(() => setToast(''), 2200); }, []);
  const add = (p, size, qty = 1) => {
    const key = `${p.id}-${size}`;
    setItems((c) => c.some((i) => i.key === key) ? c.map((i) => i.key === key ? { ...i, qty: i.qty + qty } : i) : [...c, { key, id: p.id, name: p.name, image: p.images[0], price: p.price, size, qty }]);
    notify('Added to cart'); setOpen(true);
  };
  const setQty = (key, qty) => setItems((c) => c.map((i) => i.key === key ? { ...i, qty: Math.max(1, qty) } : i));
  const remove = (key) => setItems((c) => c.filter((i) => i.key !== key));
  const totals = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const discount = coupon === 'VASTRAA10' ? Math.round(subtotal * 0.1) : 0;
    const delivery = !subtotal || subtotal - discount > 1999 ? 0 : 99;
    return { subtotal, discount, delivery, total: subtotal - discount + delivery };
  }, [items, coupon]);
  return <Ctx.Provider value={{ items, add, setQty, remove, clear: () => setItems([]), open, setOpen, coupon, setCoupon, count: items.reduce((s, i) => s + i.qty, 0), ...totals, toast, notify }}>{children}</Ctx.Provider>;
}
