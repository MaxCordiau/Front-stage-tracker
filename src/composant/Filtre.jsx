import React from 'react';
import Select from 'react-select';
import { colourOptions } from '../data';

const customStyles = {

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             // Utilisez apiService pour récupérer les catégories
    //             const data = await apiService.fetchCategories();
    //             const formattedCategories = data.map((category) => ({
    //                 value: category.name,
    //                 label: category.name,
    //                 color: chroma.random().hex(), // Assignation de couleur aléatoire pour chaque catégorie
    //             }));
    //             setCategories(formattedCategories);
    //         } catch (error) {
    //             console.error('Erreur lors du chargement des catégories:', error);
    //         }
    //     };
    //     fetchCategories();
    // }, []);


        control: (provided) => ({
            ...provided,
            backgroundColor: 'rgba(31, 41, 55, 0.5)',
            borderColor: '#4B5563',
            '&:hover': {
            borderColor: '#6B7280',
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'rgba(31, 41, 55, 0.9)',
            backdropFilter: 'blur(10px)',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#3B82F6' : state.isFocused ? 'rgba(59, 130, 246, 0.5)' : 'transparent',
            color: state.isSelected ? 'white' : '#E5E7EB',
            '&:hover': {
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            },
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: 'rgba(59, 130, 246, 0.3)',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: '#E5E7EB',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: '#E5E7EB',
            '&:hover': {
            backgroundColor: 'rgba(239, 68, 68, 0.5)',
            color: 'white',
            },
        }),
        };
        
        export default function Filtre() {
        return (
            <div className="filter-category">
                <div className="filter-content">
                    <Select
                    defaultValue={[colourOptions[2], colourOptions[3]]}
                    isMulti
                    name="colors"
                    options={colourOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={customStyles}
                    />
                </div>
            </div>
        )
    }