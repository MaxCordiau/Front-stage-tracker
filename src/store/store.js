import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiService } from '../ApiService';

export const stageStore = create(
    persist(
        (set, get) => ({
            stages: [],
            loading: false, 
            error: null,

            setStages: (stages) => set({ stages }),
            getStages: () => get().stages,

            fetchStages: async () => {
                set({ loading: true, error: null });
                try {
                    const fetchedStages = await apiService.getAll(); 
                    set({ stages: fetchedStages, loading: false });
                } catch (error) {
                    set({
                        error: error.message || "Une erreur est survenue lors du chargement des stages.",
                        loading: false
                    });
                }
            },
        }),
        { name: 'stage-storage', getStorage: () => localStorage }
    )
);
