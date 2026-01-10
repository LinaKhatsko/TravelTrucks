export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: 'alcove' | 'panelTruck' | 'fullyIntegrated';

  transmission: string;
  engine: string;

  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;

  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  gallery: GalleryItem[];
  reviews: Review[];
}

export interface CampersQuery {
  page?: number;
  limit?: number;
  location?: string;
  form?: 'alcove' | 'panelTruck' | 'fullyIntegrated';
  transmission?: string;
  AC?: true;
  bathroom?: true;
  kitchen?: true;
  TV?: true;
  radio?: true;
  refrigerator?: true;
  microwave?: true;
  gas?: true;
  water?: true;
}

export interface Review {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
}

export interface GalleryItem {
    thumb: string;
    original: string;
}

export interface FiltersState {
  location: string;
  form: string | null;
  transmission: string | null;
  features: {
    AC: boolean;
    bathroom: boolean;
    kitchen: boolean;
    TV: boolean;
    radio: boolean;
    refrigerator: boolean;
    microwave: boolean;
    gas: boolean;
    water: boolean;
  };
}

export const initialFilters: FiltersState = {
  location: "",
  form: null,
  transmission: null,
  features: {
    AC: false,
    bathroom: false,
    kitchen: false,
    TV: false,
    radio: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
  },
};