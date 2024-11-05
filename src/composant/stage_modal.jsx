import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { apiService } from '../ApiService';
import { stageStore } from '../store/store';

export default function StageModal({ isOpen, onClose, stage = null }) {
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
        if (stage) {
            const formatDate = (dateString) => {
                if (!dateString) return '';
                const date = new Date(dateString);
                return date.toISOString().slice(0, 16);
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
        }
    }, [stage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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
            setError('Une erreur est survenue lors de la soumission.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="pute bg-gray-800 rounded-lg p-6 w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
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
                        {['application_date', 'desired_start_date'].map((field) => (
                            <div key={field}>
                                <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-1">
                                    {field.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                </label>
                                <input
                                    type="datetime-local"
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
                        {stage && (
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">Type</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Sélectionnez un type</option>
                                    <option value="Email">Email</option>
                                    <option value="Tel">Tel</option>
                                    <option value="Interview">Interview</option>
                                </select>
                            </div>
                        )}
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
                                rows="3"
                            ></textarea>
                        </div>
                    )}
                    <div>
                        <label htmlFor="upload" className="block text-sm font-medium text-gray-300 mb-1">Upload de fichier</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="file"
                                id="upload"
                                name="upload"
                                onChange={handleFileChange}
                                className="hidden"
                                accept=".pdf,.doc,.docx,.jpg,.png"
                            />
                            <label htmlFor="upload" className="cursor-pointer text-blue-400 hover:underline flex items-center">
                                <Upload size={16} className="mr-2" /> Choisir un fichier
                            </label>
                            {file && <span className="text-sm text-white">{file.name}</span>}
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition">
                            {stage ? 'Enregistrer les modifications' : 'Ajouter le stage'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
