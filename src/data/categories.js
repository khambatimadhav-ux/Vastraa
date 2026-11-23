import { img, SHIRT_PHOTOS, TSHIRT_PHOTOS, JEANS_PHOTOS, WOMEN_TOP_PHOTOS, JACKET_PHOTOS } from './images';

const CATEGORY_IMG = {
  Women: img(WOMEN_TOP_PHOTOS[3], 500, 600),
  Men: img(SHIRT_PHOTOS[8], 500, 600),
  Dresses: img(WOMEN_TOP_PHOTOS[0], 500, 600),
  Tops: img(WOMEN_TOP_PHOTOS[4], 500, 600),
  Shirts: img(SHIRT_PHOTOS[0], 500, 600),
  Jeans: img(JEANS_PHOTOS[0], 500, 600),
  'Ethnic Wear': img(JACKET_PHOTOS[1], 500, 600),
  Accessories: img(JACKET_PHOTOS[0], 500, 600),
};
const c = (name) => ({ name, slug: name.toLowerCase().replace(/ /g, '-'), image: CATEGORY_IMG[name] });
export const categories = ['Women', 'Men', 'Dresses', 'Tops', 'Shirts', 'Jeans', 'Ethnic Wear', 'Accessories'].map(c);

const COLLECTION_IMG = {
  'Everyday Essentials': img(TSHIRT_PHOTOS[3], 700, 800),
  'Festive Edit': img(JACKET_PHOTOS[2], 700, 800),
  'Office Edit': img(SHIRT_PHOTOS[1], 700, 800),
  'Weekend Collection': img(JEANS_PHOTOS[1], 700, 800),
  'Premium Collection': img(WOMEN_TOP_PHOTOS[5], 700, 800),
};
export const collections = ['Everyday Essentials', 'Festive Edit', 'Office Edit', 'Weekend Collection', 'Premium Collection'].map((name) => ({ name, image: COLLECTION_IMG[name] }));
