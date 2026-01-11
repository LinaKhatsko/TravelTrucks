import { create } from 'zustand';
import axios from 'axios';
import { AxiosError } from 'axios';
import { Camper, FiltersState, initialFilters, CampersQuery, CamperForm } from '../types/types';

const API_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

interface CamperStore {
  items: Camper[];
  total: number;
  isLoading: boolean;
  error: string | null;
  filters: FiltersState;
  page: number;
  hasMore: boolean;

  // Actions
  fetchCampers: (isNewSearch?: boolean) => Promise<void>;
  setFilters: (newFilters: Partial<FiltersState>) => void;
  resetFilters: () => void;
  incrementPage: () => void;
}

export const useCamperStore = create<CamperStore>((set, get) => ({
  items: [],
  total: 0,
  isLoading: false,
  error: null,
  filters: initialFilters,
  page: 1,
  hasMore: true,

  setFilters: (newFilters) => 
    set((state) => ({ 
      filters: { ...state.filters, ...newFilters },
      page: 1 
    })),

  resetFilters: () => set({ filters: initialFilters, page: 1, items: [] }),

  incrementPage: () => set((state) => ({ page: state.page + 1 })),

  fetchCampers: async (isNewSearch = false) => {
    const { filters, page, items } = get();
    set({ isLoading: true, error: null });

    try {
      const params: CampersQuery = {
        page: isNewSearch ? 1 : page,
        limit: 4,
      };

      if (filters.location) params.location = filters.location;
      if (filters.form) params.form = filters.form as CamperForm;
      if (filters.transmission) params.transmission = filters.transmission;

      Object.entries(filters.features).forEach(([key, value]) => {
        if (value) params[key] = true;
      });

      const response = await axios.get(API_URL, { params });
      
      const newItems = response.data.items || response.data;
      const limit = 4;

      set({
        items: isNewSearch ? newItems : [...items, ...newItems],
        hasMore: newItems.length === limit,
        isLoading: false,
      });
    } catch (err) {
        const error = err as AxiosError;
      set({ 
        error:error.response?.status === 404 ? "Нічого не знайдено" : "Помилка сервера", 
        isLoading: false,
        items: isNewSearch ? [] : get().items 
      });
    }
  },
}));