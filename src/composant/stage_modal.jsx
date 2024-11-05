import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { apiService } from '../ApiService';
import { stageStore } from '../store/store';

export default function StageModal({ isOpen, onClose, stage = "" }) {
    const [formData, setFormData] = useState({
        company_name: '',
        position: '',
        application_date: '',
        contract_duration: '',
        desired_start_date: '',
        location_name: 'Sur Place',
        tag_name: 'A Envoyer',
        type: '',
        note: '',
    });

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const { fetchStages } = stageStore();

    useEffect(() => {
        console.log('stage:', stage);
        if (stage) {
            const formatDate = (dateString) => {
                if (!dateString) return '';
                const date = new Date(dateString);
                return date.toISOString().slice(0, 10); // Format 'YYYY-MM-DD'
            };

            setFormData({
                company_name: stage.company_name || '',
                position: stage.position || '',
                application_date: formatDate(stage.application_date),
                contract_duration: stage.contract_duration || '',
                desired_start_date: formatDate(stage.desired_start_date),
                location_name: stage.location_name || 'Sur Place',
                tag_name: stage.tag_name || 'A Envoyer',
                type: stage.type || '',
                note: stage.note || '',
            });
        } else {
            // Reset form if stage is null
            setFormData({
                company_name: '',
                position: '',
                application_date: '',
                contract_duration: '',
                desired_start_date: '',
                location_name: 'Sur Place',
                tag_name: 'A Envoyer',
                type: '',
                note: '',
            });
            setFile(null);
        }
    }, [stage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const updatedFormData = new FormData();
            Object.keys(formData).forEach((key) => {
                updatedFormData.append(key, formData[key]);
            });

            if (file) {
                updatedFormData.append('file', file);
            }

            if (stage) {
                await apiService.update(stage.id, updatedFormData);
            } else {
                await apiService.create(updatedFormData);
            }
            fetchStages();
            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('Une erreur est survenue lors de la soumission. Veuillez réessayer.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-white">
                        {stage ? 'Modifier le stage' : 'Ajouter un stage'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition duration-200">
                        <X size={24} />
                    </button>
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['company_name', 'position', 'contract_duration'].map((field) => (
                            <div key={field}>
                                <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-1">
                                    {field.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                </label>
                                <input
                                    type="text"
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        ))}
                        <div>
                            <label htmlFor="application_date" className="block text-sm font-medium text-gray-300 mb-1">Date de candidature</label>
                            <input
                                type="date"
                                id="application_date"
                                name="application_date"
                                value={formData.application_date}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="desired_start_date" className="block text-sm font-medium text-gray-300 mb-1">Date de début souhaitée</label>
                            <input
                                type="date"
                                id="desired_start_date"
                                name="desired_start_date"
                                value={formData.desired_start_date}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="location_name" className="block text-sm font-medium text-gray-300 mb-1">Lieu</label>
                            <select
                                id="location_name"
                                name="location_name"
                                value={formData.location_name}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="Sur Place">Sur Place</option>
                                <option value="A Distance">A Distance</option>
                                <option value="Teletravail">Teletravail</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="tag_name" className="block text-sm font-medium text-gray-300 mb-1">Statut</label>
                            <select
                                id="tag_name"
                                name="tag_name"
                                value={formData.tag_name}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="A Envoyer">A Envoyer</option>
                                <option value="Envoyer">Envoyer</option>
                                <option value="A Suivre">A Suivre</option>
                                <option value="Entretien Prevue">Entretien Prevue</option>
                                <option value="Accepter">Accepter</option>
                                <option value="Refuser">Refuser</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">Type</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Sélectionnez un type</option>
                                <option value="Email">Email</option>
                                <option value="Tel">Tel</option>
                                <option value="Interview">Interview</option>
                            </select>
                        </div>
                    </div>
                    {stage && (
                        <div>
                            <label htmlFor="note" className="block text-sm font-medium text-gray-300 mb-1">Note</label>
                            <textarea
                                id="note"
                                name="note"
                                value={formData.note}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Ajouter un fichier</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3"
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-600 text-white rounded-md py-2 px-4 mr-2 hover:bg-gray-500"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-500"
                        >
                            {stage ? 'Modifier' : 'Ajouter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
