export const apiService = {
    async create(data) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/add/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
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
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/`, {
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
            console.log("Données récupérées:", data);
            return data;
        } catch (error) {
            console.error("Erreur dans apiService.getAll:", error);
            throw error;
        }
    },

    async get(id) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/${id}`, {
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
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
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
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/delete/${id}`, {
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
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/update/addInteract/${id}`, {
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
};

