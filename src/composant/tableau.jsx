import React, { useEffect  } from 'react';
import { stageStore } from '../store/store';

const StageList = () => {
  const stages = stageStore((state) => state.stages);
  const fetchStages = stageStore((state) => state.fetchStages);

  useEffect(() => {
    fetchStages();
  }, [fetchStages]);

  console.log("store : ",stages);

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
          {stages.length > 0 ? (
            stages.map((stages) => (
              <tr key={stages.id} className="border-b border-gray-700 hover:bg-gray-700 transition duration-300">
                <td className="py-3 px-4">{stages.company_name}</td>
                <td className="py-3 px-4">{stages.position}</td>
                <td className="py-3 px-4">
                  {stages.application_date ? new Date(stages.application_date).toLocaleDateString() : 'Date invalide'}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${stages.tag_name === 'En attente' ? 'bg-yellow-500 text-yellow-900' :
                      stages.tag_name === 'Rejeté' ? 'bg-red-500 text-red-900' :
                      'bg-green-500 text-green-900'}`}>
                    {stages.tag_name}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-3 px-4 text-center">Aucun stage trouvé</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StageList;
