import React, { useEffect, useState } from 'react';
import { apiService } from '../ApiService'; 

export default function Filtre() {
    const [statuses, setStatuses] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [locations] = useState(['Sur Place', 'A Distance', 'Teletravail']); 
    const [selectedLocation, setSelectedLocation] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [filteredStages, setFilteredStages] = useState([]); 

    const fetchStages = async () => {
        try {
            const data = await apiService.getTags({
                location: selectedLocation,
                status: selectedStatus,
                dateFrom,
                dateTo
            });
    
            if (data && Array.isArray(data)) {
                setFilteredStages(data); 
                setStatuses([...new Set(data.map(stage => stage.tag_name))]); 
            } else {
                console.warn('Aucun stage trouvé dans la réponse:', data);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des stages:', error);
        }
    };
    
    
    useEffect(() => {
        fetchStages();
    }, [selectedLocation, selectedStatus, dateFrom, dateTo]); 

    const handleStatusChange = (e) => setSelectedStatus(e.target.value);
    const handleLocationChange = (e) => setSelectedLocation(e.target.value);
    const handleDateFromChange = (e) => setDateFrom(e.target.value);
    const handleDateToChange = (e) => setDateTo(e.target.value);

    return (
        <div className="mb-5 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-200">Status</label>
                    <select 
                        value={selectedStatus} 
                        onChange={handleStatusChange} 
                        className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Statuses</option>
                        {statuses.map((status, index) => (
                            <option key={index} value={status}>{status}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-200">Location</label>
                    <select 
                        value={selectedLocation} 
                        onChange={handleLocationChange} 
                        className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Locations</option>
                        {locations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-200">Date From</label>
                    <input 
                        type="date" 
                        value={dateFrom} 
                        onChange={handleDateFromChange} 
                        className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-200">Date To</label>
                    <input 
                        type="date" 
                        value={dateTo} 
                        onChange={handleDateToChange} 
                        className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    );
}
