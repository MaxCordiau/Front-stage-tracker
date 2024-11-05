export const apiService = {
    async create(data) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}stages/add/`, {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de la création du stage");
            }

            return await response.json();
        } catch (error) {
            console.error("Erreur dans apiService.create:", error);
            throw error;
        }
    },

    async getAll() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}stages/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de la récupération des stages");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erreur dans apiService.getAll:", error);
            throw error;
        }
    },

    async getTags({ status, location, dateFrom, dateTo }) {
        try {
            // Créer un objet pour les paramètres de recherche
            const params = new URLSearchParams();
    
            // Ajouter les paramètres de filtrage si présents
            if (status) {
                params.append('tag_name', status);
            }
            if (location) {
                params.append('location_name', location);
            }
            if (dateFrom) {
                params.append('dateFrom', dateFrom);
            }
            if (dateTo) {
                params.append('dateTo', dateTo);
            }
    
            const url = `${import.meta.env.VITE_BASE_URL}stages/?${params.toString()}`;
    
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de la récupération des stages");
            }
    
            const data = await response.json();
    
            if (data && Array.isArray(data.data)) { // Changer ici pour 'data.data' si nécessaire
                return data.data; // Renvoie les données des stages
            } else {
                console.warn('Aucun stage trouvé dans la réponse:', data);
                return []; // Renvoie un tableau vide si aucun stage trouvé
            }
        } catch (error) {
            console.error("Erreur dans apiService.getTags:", error);
            throw error;
        }
    },
    
    

    async get(id) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}stages/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de la récupération du stage");
            }

            return await response.json();
        } catch (error) {
            console.error("Erreur dans apiService.get:", error);
            throw error;
        }
    },

    async update(id, data) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}stages/update/${id}`, {
                method: 'PUT',
                body: data,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de la modification du stage");
            }

            return await response.json();
        } catch (error) {
            console.error("Erreur dans apiService.update:", error);
            throw error;
        }
    },


    async delete(id) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}stages/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de la suppression du stage");
            }

            return await response.json();
        } catch (error) {
            console.error("Erreur dans apiService.delete:", error);
            throw error;
        }
    },

    async addInteract(id, data) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}stages/update/addInteract/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de l'ajout d'interaction");
            }

            return await response.json();
        } catch (error) {
            console.error("Erreur dans apiService.addInteract:", error);
            throw error;
        }
    },

    async uploads(file) {
        try {
            const formData = new FormData();
            formData.append('file', file); 
    
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}files`, {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de l'upload du fichier");
            }
    
            return await response.json();
        } catch (error) {
            console.error("Erreur dans apiService.uploads:", error);
            throw error;
        }
    }
    
};

