import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css'; import 'swiper/css/navigation';
import ProductCard from './ProductCard';
export default function ProductSlider({ items, onQuickView }) {
  return (
    <Swiper modules={[Navigation]} navigation spaceBetween={16} slidesPerView={2} breakpoints={{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}>
      {items.map((p) => <SwiperSlide key={p.id}><ProductCard product={p} onQuickView={onQuickView} /></SwiperSlide>)}
    </Swiper>
  );
}
