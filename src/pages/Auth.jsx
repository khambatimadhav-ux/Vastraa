import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
export default function Auth({ register }) {
  const nav = useNavigate(); const { notify } = useCart();
  return (
    <div className="container section"><form className="box auth" onSubmit={(e) => { e.preventDefault(); notify(register ? 'Account created' : 'Welcome back'); nav('/profile'); }}>
      <h1>{register ? 'Create account' : 'Log in'}</h1>
      {register && <input required placeholder="Full name" aria-label="Full name" />}<input type="email" required placeholder="Email" aria-label="Email" /><input type="password" required minLength="6" placeholder="Password" aria-label="Password" />
      {register ? <><input type="password" required placeholder="Confirm password" aria-label="Confirm password" /><label><input type="checkbox" required /> I accept the terms</label></> : <div className="between"><label><input type="checkbox" /> Remember me</label><a className="link" href="#!">Forgot password?</a></div>}
      <button className="btn btn-dark block">{register ? 'Create account' : 'Log in'}</button>{!register && <button type="button" className="btn btn-outline block">Continue with Google</button>}
      <p className="muted small">{register ? <>Already a member? <Link className="link" to="/login">Log in</Link></> : <>New here? <Link className="link" to="/register">Create an account</Link></>}</p></form></div>
  );
}
