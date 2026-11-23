import { img, SHIRT_PHOTOS, TSHIRT_PHOTOS, JEANS_PHOTOS, WOMEN_TOP_PHOTOS, JACKET_PHOTOS } from './images';
const C = { Ivory: '#F3EDE2', Black: '#1F1F1F', Sand: '#C9A882', Olive: '#6B705C', Rust: '#A4553A', Navy: '#26324A', Indigo: '#3D4F7A', Rose: '#D9A5A0' };
const A = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
// [name, category, gender, price, originalPrice, colors, fabric, fit, occasion]
const seed = [
  ['Linen Wrap Dress', 'Dresses', 'Women', 2499, 3999, ['Sand', 'Olive'], 'Linen blend', 'Regular', 'Casual'],
  ['Satin Slip Midi', 'Dresses', 'Women', 3299, 4599, ['Rose', 'Black'], 'Satin', 'Slim', 'Party'],
  ['Tiered Cotton Maxi', 'Dresses', 'Women', 2899, 3499, ['Ivory', 'Rust'], 'Cotton', 'Relaxed', 'Weekend'],
  ['Ribbed Knit Top', 'Tops', 'Women', 999, 1499, ['Ivory', 'Black'], 'Cotton knit', 'Slim', 'Casual'],
  ['Puff Sleeve Blouse', 'Tops', 'Women', 1399, 1899, ['Rose', 'Ivory'], 'Crepe', 'Regular', 'Office'],
  ['Wrap Front Top', 'Tops', 'Women', 1199, 1199, ['Rust', 'Navy'], 'Viscose', 'Regular', 'Casual'],
  ['Vastraa Essential Crew Tee', 'Tops', 'Women', 799, 1099, ['Ivory', 'Rose'], 'Cotton jersey', 'Slim', 'Casual'],
  ['Oxford Button-Down', 'Shirts', 'Men', 1799, 2499, ['Ivory', 'Indigo'], 'Cotton oxford', 'Regular', 'Office'],
  ['Linen Camp Shirt', 'Shirts', 'Men', 1999, 2799, ['Sand', 'Olive'], 'Linen', 'Relaxed', 'Weekend'],
  ['Checked Flannel Shirt', 'Shirts', 'Men', 1699, 1699, ['Rust', 'Navy'], 'Brushed cotton', 'Regular', 'Casual'],
  ['Mandarin Collar Shirt', 'Shirts', 'Men', 1899, 2399, ['Black', 'Ivory'], 'Poplin', 'Slim', 'Party'],
  ['Vastraa Logo Tee', 'Shirts', 'Men', 899, 1199, ['Ivory', 'Black'], 'Cotton jersey', 'Regular', 'Casual'],
  ['Vastraa Graphic Tee', 'Shirts', 'Men', 949, 1299, ['Navy', 'Sand'], 'Cotton jersey', 'Regular', 'Weekend'],
  ['High-Rise Straight Jeans', 'Jeans', 'Women', 2299, 2999, ['Indigo', 'Black'], 'Denim', 'Straight', 'Casual'],
  ['Wide-Leg Denim', 'Jeans', 'Women', 2499, 3299, ['Indigo', 'Ivory'], 'Denim', 'Wide', 'Weekend'],
  ['Slim Tapered Jeans', 'Jeans', 'Men', 2199, 2799, ['Navy', 'Black'], 'Stretch denim', 'Slim', 'Casual'],
  ['Relaxed Fit Jeans', 'Jeans', 'Men', 2099, 2099, ['Indigo', 'Sand'], 'Denim', 'Relaxed', 'Weekend'],
  ['Chanderi Anarkali Kurta', 'Ethnic Wear', 'Women', 3499, 4999, ['Rose', 'Olive'], 'Chanderi silk', 'Flared', 'Festive'],
  ['Block Print Kurta Set', 'Ethnic Wear', 'Women', 2799, 3699, ['Rust', 'Ivory'], 'Cotton', 'Regular', 'Festive'],
  ['Silk Blend Nehru Jacket', 'Ethnic Wear', 'Men', 3199, 4299, ['Navy', 'Black'], 'Silk blend', 'Slim', 'Festive'],
  ['Straight Cotton Kurta', 'Ethnic Wear', 'Men', 1599, 2199, ['Sand', 'Ivory'], 'Cotton', 'Regular', 'Festive'],
  ['Leather Tote Bag', 'Accessories', 'Women', 3999, 5499, ['Black', 'Sand'], 'Vegan leather', 'One size', 'Office'],
  ['Silk Printed Scarf', 'Accessories', 'Women', 899, 1299, ['Rose', 'Navy'], 'Silk', 'One size', 'Casual'],
  ['Minimal Leather Belt', 'Accessories', 'Men', 1199, 1499, ['Black', 'Rust'], 'Leather', 'One size', 'Office'],
  ['Canvas Weekender', 'Accessories', 'Men', 2999, 3999, ['Olive', 'Sand'], 'Canvas', 'One size', 'Weekend'],
  ['Pleated Trousers', 'Tops', 'Men', 2199, 2899, ['Sand', 'Navy'], 'Wool blend', 'Regular', 'Office'],
  ['Cropped Trench', 'Dresses', 'Women', 4599, 6499, ['Sand', 'Black'], 'Gabardine', 'Regular', 'Office'],
];

// Pick real, face-less product photography for each item, with a running counter per
// pool so products in the same category get different photos instead of repeating.
const crops = ['entropy', 'faces', 'edges']; // varies the crop box only — no people in these photos
const MISC_PHOTOS = JACKET_PHOTOS.concat(WOMEN_TOP_PHOTOS.slice(4), SHIRT_PHOTOS.slice(7));
const counters = {};
const next = (pool) => {
  const key = pool === TSHIRT_PHOTOS ? 'ts' : pool === JEANS_PHOTOS ? 'j' : pool === WOMEN_TOP_PHOTOS ? 'w' : pool === MISC_PHOTOS ? 'm' : 'sh';
  counters[key] = (counters[key] || 0) % pool.length;
  const photo = pool[counters[key]];
  counters[key] += 1;
  return photo;
};
const galleryFor = (gender, category, name) => {
  let pool;
  if (category === 'Jeans') pool = JEANS_PHOTOS;
  else if (/\bTee\b/.test(name)) pool = TSHIRT_PHOTOS;
  else if (category === 'Shirts') pool = SHIRT_PHOTOS;
  else if (category === 'Ethnic Wear' || category === 'Accessories') pool = MISC_PHOTOS;
  else if (gender === 'Women') pool = WOMEN_TOP_PHOTOS;
  else pool = SHIRT_PHOTOS;
  const photo = next(pool);
  return crops.map((c) => img(photo, 600, 800, c));
};

export const products = seed.map(([name, category, gender, price, originalPrice, colors, fabric, fit, occasion], i) => ({
  id: i + 1, name, category, gender, price, originalPrice,
  discount: Math.round((1 - price / originalPrice) * 100),
  rating: +(3.8 + ((i * 7) % 12) / 10).toFixed(1), reviews: 24 + ((i * 37) % 300),
  images: galleryFor(gender, category, name), colors: colors.map((n) => ({ name: n, hex: C[n] })),
  sizes: category === 'Accessories' ? ['One size'] : A, unavailable: i % 5 === 0 ? ['XS'] : [],
  description: `${name} in ${fabric.toLowerCase()}, cut for a ${fit.toLowerCase()} fit and made for ${occasion.toLowerCase()} days.`,
  fabric, fit, pattern: i % 3 ? 'Solid' : 'Textured', occasion, washCare: 'Machine wash cold, line dry',
  isNew: i % 4 === 0 || i > 19, isBestSeller: i % 3 === 0, isSale: price < originalPrice, inStock: i % 9 !== 8, brand: 'Vastraa',
}));
export const getProduct = (id) => products.find((p) => p.id === Number(id));
export const fmt = (n) => '₹' + n.toLocaleString('en-IN');
