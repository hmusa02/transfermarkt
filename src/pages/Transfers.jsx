import { useState } from "react";
import { TrendingUp, ArrowRight, Euro, Calendar } from "lucide-react";

export default function Transfers() {
  const [transfers] = useState([
    {
      id: 1,
      player: "Joško Gvardiol",
      from_club: "RB Leipzig",
      to_club: "Manchester City",
      fee: 90000000,
      date: "2025-01-10",
      type: "permanent",
    },
    {
      id: 2,
      player: "Luka Modrić",
      from_club: "Real Madrid",
      to_club: "AC Milan",
      fee: 0,
      date: "2025-01-08",
      type: "free",
    },
    {
      id: 3,
      player: "Mateo Kovačić",
      from_club: "Chelsea",
      to_club: "Manchester City",
      fee: 35000000,
      date: "2025-01-05",
      type: "permanent",
    },
    {
      id: 4,
      player: "Marcelo Brozović",
      from_club: "Inter Milan",
      to_club: "Al-Nassr",
      fee: 18000000,
      date: "2025-01-03",
      type: "permanent",
    },
    {
      id: 5,
      player: "Dominik Livaković",
      from_club: "Dinamo Zagreb",
      to_club: "Fenerbahçe",
      fee: 8000000,
      date: "2024-12-28",
      type: "permanent",
    },
  ]);

  const formatFee = (fee) => {
    if (fee === 0) return "Free transfer";
    if (fee >= 1000000) return `€${(fee / 1000000).toFixed(1)}M`;
    return `€${(fee / 1000).toFixed(0)}K`;
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white mb-2">Transfers</h1>
        <p className="text-gray-400">Latest transfers and player moves</p>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="stat-card-premium">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-2">This month</p>
                  <p className="text-3xl font-semibold text-white">156</p>
                </div>
                <TrendingUp className="w-10 h-10 text-gray-400 opacity-30" />
              </div>
            </div>
            <div className="stat-card-premium">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Total value</p>
                  <p className="text-3xl font-semibold text-white">€1.2B</p>
                </div>
                <Euro className="w-10 h-10 text-gray-400 opacity-30" />
              </div>
            </div>
            <div className="stat-card-premium">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Biggest transfer</p>
                  <p className="text-3xl font-semibold text-white">€90M</p>
                </div>
                <TrendingUp className="w-10 h-10 text-gray-400 opacity-30" />
              </div>
            </div>
          </div>

          {/* Transfers Table */}
          <div className="card-premium overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Player
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        From
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        To
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2a2a]">
                    {transfers.map((transfer) => (
                      <tr
                        key={transfer.id}
                        className="table-row cursor-pointer"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 player-avatar rounded-lg flex items-center justify-center text-white font-bold mr-3">
                              {transfer.player
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div className="font-medium text-white hover:text-gray-300 transition-colors">
                              {transfer.player}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 font-medium">
                          {transfer.from_club}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <ArrowRight className="w-4 h-4 mr-1.5 text-gray-400" />
                            <span className="font-medium text-white">
                              {transfer.to_club}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`font-semibold ${
                              transfer.fee === 0
                                ? "text-gray-400"
                                : "text-white"
                            }`}
                          >
                            {formatFee(transfer.fee)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                          <div className="flex items-center text-sm font-medium">
                            <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                            {new Date(transfer.date).toLocaleDateString("en-US")}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-[#1a1a1a] px-6 py-4 border-t border-[#2a2a2a] flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Showing 1-5 of 156 transfers
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-2 border border-[#2a2a2a] rounded-md hover:bg-[#2a2a2a] text-gray-300 font-medium transition-colors">
                    Previous
                  </button>
                  <button className="px-3 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 font-medium transition-colors">
                    1
                  </button>
                  <button className="px-3 py-2 border border-[#2a2a2a] rounded-md hover:bg-[#2a2a2a] text-gray-300 font-medium transition-colors">
                    Next
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

