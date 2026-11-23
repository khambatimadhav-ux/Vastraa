// All image URLs live here. Swap for local files in src/assets later.
// Real photography (Unsplash, free to use under the Unsplash License).
const u = (id) => `https://images.unsplash.com/photo-${id}`;
export const img = (id, w = 600, h = 800, focal = 'entropy') =>
  `${u(id)}?auto=format&fit=crop&w=${w}&h=${h}&q=80&crop=${focal}`;

// Product-only shots: folded/hanging garments, no people/faces. Large, varied pools
// so tiles and product cards don't repeat the same photo across the site.
export const SHIRT_PHOTOS = [
  '1620799139834-6b8f844fbe61', // white crew-neck shirt, floral textile
  '1602810316693-3667c854239a', // blue button-up shirt on white table
  '1602810319428-019690571b5b', // polka dot shirt
  '1548768041-2fceab4c0b85',    // three v-neck shirts, black/grey/brown
  '1623658580851-3b25bf83b4ea', // blue polo shirt on pink
  '1619032209422-fc090f6a3f5f', // grey/brown shirt textile
  '1700659392887-0a026c53f8e2', // wooden shelf, folded shirts
  '1489987707025-afc232f7ea0f', // hanged shirts on rack, close-up
  '1532453288672-3a27e9be9efd', // assorted-colour shirts on rack
  '1562157873-818bc0726f68',    // folded shirts on wooden panel
  '1558769132-cb1aea458c5e',    // top on a clothes stand
];
export const TSHIRT_PHOTOS = [
  '1620799140408-edc6dcb6d633', // plain white crew-neck tee
  '1782227293813-040b9f9ce99e', // stack of folded flannel shirts, b/w
  '1782227290216-8ef26139b7fa', // stack of folded shirts, b/w
  '1716951219353-e4a16dce3186', // three tees, colour group
  '1716951865304-e9567c6649e4', // three polo shirts stacked
  '1716951735063-3d60c2c288e4', // four tees, "comfort" print
  '1716951884362-e560807383b5', // three tees, colour group
];
export const JEANS_PHOTOS = [
  '1624378440847-4a64ee1a889d', // jeans, flat
  '1516762689617-e1cffcef479d', // jeans with cardigan, flat lay
];
export const WOMEN_TOP_PHOTOS = [
  '1599971284305-674fb528fa78', // lace tank top
  '1525507119028-ed4c629a60a3', // women's folded clothes
  '1567401893414-76b7b1e5a7a5', // assorted-colour clothes
  '1540221652346-e5dd6b50f3e7', // clothes on a wooden wall rack
  '1434389677669-e08b4cac3105', // crochet poncho on a hanger
  '1490481651871-ab68de25d43d', // clothes on wooden hangers
  '1445205170230-053b83016050', // hanging clothes, colour lot
];
export const JACKET_PHOTOS = [
  '1591047139829-d91aecb6caea', // jacket on a hanger
  '1603400521630-9f2de124b33b', // clothing rack, neutral tones
  '1441984904996-e0b6ba687e04', // boutique interior, hanging racks
];

// Model portraits — kept only for the About / Contact pages.
export const MEN_PHOTOS = [
  '1614247521228-d4184c975eff', '1520823591453-587fd10f9ae4', '1434510423563-c7e99bbc5bbd',
  '1565679871226-33cfa91bedae', '1572965841528-54da2f2461d9', '1558608846-7295ca9d0348',
  '1500964935344-6219dea133e4', '1519842896186-70b8a0c55fa6', '1483818993731-3d76e0c51133',
  '1518009007177-707f97947483', '1571699532031-0e27b47f30ae', '1525187440203-df529491b0a4',
];
export const WOMEN_PHOTOS = [
  '1657979768954-3422b8c4affa', '1613594526137-a11fd03582d6', '1584930652097-e9ca753f4e03',
];
// Kept for backward compatibility.
export const TOP_PHOTOS = WOMEN_TOP_PHOTOS;
export const DENIM_PHOTO = JEANS_PHOTOS[0];

export const heroImages = [
  img(WOMEN_TOP_PHOTOS[3], 1600, 900), // New season
  img(WOMEN_TOP_PHOTOS[1], 1600, 900), // Women's collection
  img(SHIRT_PHOTOS[9], 1600, 900),     // Men's collection
  img(JACKET_PHOTOS[1], 1600, 900),    // Festive / edit collection
];
