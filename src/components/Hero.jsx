import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css'; import 'swiper/css/pagination'; import 'swiper/css/navigation'; import 'swiper/css/effect-fade';
import { Link } from 'react-router-dom';
import { heroImages } from '../data/images';
const slides = [
  ['New season', 'Elevate Your Everyday Style', 'Thoughtfully designed fashion made for your everyday moments.', '/new-arrivals'],
  ["Women's collection", 'Easy Pieces, Made to Move', 'Linen, satin and soft knits in colours that work all week.', '/women'],
  ["Men's collection", 'Sharp Shirts, Relaxed Denim', 'Clean cuts for the office and the weekend.', '/men'],
  ['Festive collection', 'Dressed for Every Celebration', 'Kurtas, jackets and sets in rich, hand-finished fabrics.', '/category/ethnic-wear'],
];
export default function Hero() {
  return (
    <Swiper className="hero" modules={[Autoplay, Pagination, Navigation, EffectFade]} effect="fade" loop autoplay={{ delay: 5500 }} pagination={{ clickable: true }} navigation>
      {slides.map(([label, title, text, to], i) => (
        <SwiperSlide key={label}>
          <img src={heroImages[i]} alt="" />
          <div className="hero-copy container"><div><p className="label">{label}</p><h1>{title}</h1><p>{text}</p>
            <div className="row"><Link className="btn btn-accent" to="/shop">Shop collection</Link><Link className="btn btn-light" to={to}>Explore more</Link></div></div></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
