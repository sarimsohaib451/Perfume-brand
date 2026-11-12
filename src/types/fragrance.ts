export type ScentFamily = 
  | 'All Fragrances'
  | 'Woody & Smoky'
  | 'Amber & Resinous'
  | 'Floral & Solar'
  | 'Fresh & Oceanic'
  | 'Gourmand & Spice';

export type BottleSize = '50ml' | '100ml' | '2ml Discovery';

export type Currency = 'USD' | 'EUR' | 'GBP';

export interface NotePyramid {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Fragrance {
  id: string;
  name: string;
  subTitle: string;
  collection: string;
  scentFamily: ScentFamily;
  concentration: string;
  quote: string;
  description: string;
  notes: NotePyramid;
  prices: {
    '50ml': number;
    '100ml': number;
    '2ml Discovery': number;
  };
  image: string;
  moodTags: string[];
  longevity: string; // e.g. "14+ Hours"
  sillage: string; // e.g. "Intense & Enveloping"
  season: string; // e.g. "Autumn / Winter & Cool Evenings"
  characterTrait: string;
}

export interface CartItem {
  id: string; // unique item id: fragranceId-size
  fragranceId: string;
  name: string;
  subTitle: string;
  size: BottleSize;
  price: number;
  quantity: number;
  image: string;
  customVials?: string[];
}

export interface QuizAnswerState {
  vibe?: string;
  setting?: string;
  dominantNote?: string;
}
