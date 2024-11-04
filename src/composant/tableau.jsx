import React from "react";

export default function Tableau() {
  const jobData = [
    { company: "OpenAI", position: "Développeur", date: "2023-11-04", status: "En attente" },
    { company: "Google", position: "Ingénieur Logiciel", date: "2023-10-20", status: "Rejeté" },
    { company: "Facebook", position: "Analyste", date: "2023-10-15", status: "Accepté" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-3 px-4 font-semibold text-sm uppercase">Company</th>
            <th className="py-3 px-4 font-semibold text-sm uppercase">Position</th>
            <th className="py-3 px-4 font-semibold text-sm uppercase">Date</th>
            <th className="py-3 px-4 font-semibold text-sm uppercase">Status</th>
          </tr>
        </thead>
        <tbody>
          {jobData.map((job, index) => (
            <tr key={index} className="border-b border-gray-700 hover:bg-gray-700 transition duration-300">
              <td className="py-3 px-4">{job.company}</td>
              <td className="py-3 px-4">{job.position}</td>
              <td className="py-3 px-4">{job.date}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${job.status === 'En attente' ? 'bg-yellow-500 text-yellow-900' :
                    job.status === 'Rejeté' ? 'bg-red-500 text-red-900' :
                    'bg-green-500 text-green-900'}`}>
                  {job.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}