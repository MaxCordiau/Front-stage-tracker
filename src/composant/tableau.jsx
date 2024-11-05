import React, { useEffect, useState } from 'react';
import { stageStore } from '../store/store';
import StageModal from './stage_modal';

const StageList = () => {
  const { stages, fetchStages } = stageStore();
  const [selectedStage, setSelectedStage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStages();
  }, [fetchStages]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date invalide';
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) ? date.toLocaleDateString() : 'Date invalide';
  };

  const getStatusStyle = (tagName) => {
    switch (tagName) {
      case 'En attente':
        return 'bg-yellow-500 text-yellow-900';
      case 'Rejeté':
        return 'bg-red-500 text-red-900';
      default:
        return 'bg-green-500 text-green-900';
    }
  };

  const handleStageClick = (stage) => {
    setSelectedStage(stage);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStage(null);
  };

  const stagesData = stages?.data && Array.isArray(stages.data) ? stages.data : [];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-3 px-4 font-semibold text-sm uppercase">Entreprise</th>
            <th className="py-3 px-4 font-semibold text-sm uppercase">Position</th>
            <th className="py-3 px-4 font-semibold text-sm uppercase">Date</th>
            <th className="py-3 px-4 font-semibold text-sm uppercase">Status</th>
          </tr>
        </thead>
        <tbody>
          {stagesData.length > 0 ? (
            stagesData.map((stage) => (
              <tr 
                key={stage.id} 
                className="border-b border-gray-700 hover:bg-gray-700 transition duration-300 cursor-pointer"
                onClick={() => handleStageClick(stage)}
              >
                <td className="py-3 px-4">{stage.company_name}</td>
                <td className="py-3 px-4">{stage.position}</td>
                <td className="py-3 px-4">{formatDate(stage.application_date)}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(stage.tag_name)}`}>
                    {stage.tag_name}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-3 px-4 text-center">Aucun stage trouvé</td>
            </tr>
          )}
        </tbody>
      </table>
      <StageModal isOpen={isModalOpen} onClose={closeModal} stage={selectedStage} />
    </div>
  );
};

export default StageList;