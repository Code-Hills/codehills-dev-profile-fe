import React, { useState } from 'react';

const PerformanceReports = () => {
  const [developers, setDevelopers] = useState([
    {
      id: 1,
      name: 'John Doe',
      peerRating1: 4,
      peerRating2: 5,
      selfRating: 4,
      managerRating: 5,
    },
    {
      id: 2,
      name: 'Jane Smith',
      peerRating1: 3,
      peerRating2: 3,
      selfRating: 4,
      managerRating: 4,
    },
    {
      id: 3,
      name: 'Bob Johnson',
      peerRating1: 2,
      peerRating2: 2,
      selfRating: 3,
      managerRating: 3,
    },
  ]);

  const getTotalRating = (developer: Record<string, any>) => {
    return (
      developer.peerRating1 +
      developer.peerRating2 +
      developer.selfRating +
      developer.managerRating
    );
  };

  const getAverageRating = (developer: Record<string, any>) => {
    const totalRating = getTotalRating(developer);
    return totalRating / 4;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium mb-4">
        Performance Reports
      </h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2">
            <th className="px-4 py-2 text-left font-medium">Name</th>
            <th className="px-4 py-2 text-left font-medium">
              Peer Review 1
            </th>
            <th className="px-4 py-2 text-left font-medium">
              Peer Review 2
            </th>
            <th className="px-4 py-2 text-left font-medium">
              Self Review
            </th>
            <th className="px-4 py-2 text-left font-medium">
              Manager Review
            </th>
            <th className="px-4 py-2 text-left font-medium">
              Total Rating
            </th>
            <th className="px-4 py-2 text-left font-medium">
              Average Rating
            </th>
          </tr>
        </thead>
        <tbody>
          {developers.map(developer => (
            <tr key={developer.id} className="border-b">
              <td className="px-4 py-2">{developer.name}</td>
              <td className="px-4 py-2">{developer.peerRating1}</td>
              <td className="px-4 py-2">{developer.peerRating2}</td>
              <td className="px-4 py-2">{developer.selfRating}</td>
              <td className="px-4 py-2">{developer.managerRating}</td>
              <td className="px-4 py-2">
                {getTotalRating(developer)}
              </td>
              <td className="px-4 py-2">
                {getAverageRating(developer)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PerformanceReports;
