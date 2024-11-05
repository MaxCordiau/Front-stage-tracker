import React, { useEffect, useMemo } from 'react';
import { Briefcase, ChartColumn, CheckCircle, XCircle, AlertCircle } from 'lucide-react'; // Assurez-vous que toutes les icônes sont importées
import { stageStore } from '../store/store';

const statusConfig = {
  'A Envoyer': { icon: AlertCircle, color: 'from-blue-400 to-blue-600' },
  'Envoyer': { icon: ChartColumn, color: 'from-yellow-400 to-yellow-600' },
  'A Suivre': { icon: CheckCircle, color: 'from-green-400 to-green-600' },
  'Entretien Prevue': { icon: CheckCircle, color: 'from-teal-400 to-teal-600' },
  'Accepter': { icon: CheckCircle, color: 'from-green-400 to-green-600' },
  'Refuser': { icon: XCircle, color: 'from-red-400 to-red-600' },
};

export default function Card() {
  const stages = stageStore((state) => state.stages);
  const fetchStages = stageStore((state) => state.fetchStages);
  const loading = stageStore((state) => state.loading);
  const error = stageStore((state) => state.error);

  useEffect(() => {
    fetchStages();
  }, [fetchStages]);

  const stats = useMemo(() => {
    // Assurez-vous que les stages sont bien sous forme de tableau
    const stagesArray = Array.isArray(stages) ? stages : stages?.data || [];
    const stageCounts = {};

    // Initialisez les comptes pour chaque type de stage
    Object.keys(statusConfig).forEach((status) => {
      stageCounts[status] = 0;
    });

    // Comptez chaque stage
    stagesArray.forEach((stage) => {
      // Assurez-vous que stage.tag_name existe et est correct
      if (statusConfig[stage.tag_name]) {
        stageCounts[stage.tag_name]++;
      }
    });

    return stageCounts;
  }, [stages]);

  const cardData = Object.entries(statusConfig).map(([status, { icon, color }]) => ({
    icon,
    title: status,
    value: stats[status] || 0,
    color,
  }));

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <section className="flex flex-wrap justify-between gap-6">
      {cardData.map((item, index) => (
        <article
          key={index}
          className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out flex-1 min-w-[200px] max-w-[250px]"
        >
          <div className={`inline-flex p-3 rounded-full bg-gradient-to-br ${item.color} mb-4`}>
            <item.icon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {item.value}
          </p>
        </article>
      ))}
    </section>
  );
}
