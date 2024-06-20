import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const useBancoStore = create(persist(
  (set, get) => ({
    banks: [],
    searchQuery: '',
    fetchBanks: async () => {
      const response = await axios.get('https://dev.obtenmas.com/catom/api/challenge/banks');
      set({ banks: response.data });
    },
    deleteBank: (bankName) => {
      set((state) => ({
        banks: state.banks.filter(bank => bank.bankName !== bankName)
      }));
    },
    setSearchQuery: (query) => {
      set({ searchQuery: query });
    },
    sortBanks: () => {
      set((state) => ({
        banks: [...state.banks].sort((a, b) => a.bankName.localeCompare(b.bankName))
      }));
    },
  }),
  {
    name: 'bank-storage', 
    getStorage: () => localStorage, // define el almacenamiento
  }
));

export default useBancoStore;
