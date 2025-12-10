import { useState } from "react";
import ClubCard from "../components/ClubCard";
import { Search, Filter, Trophy, TrendingUp } from "lucide-react";

export default function Clubs() {
  const [clubs] = useState([
    {
      id: 1,
      name: "Dinamo Zagreb",
      city: "Zagreb",
      country: "Hrvatska",
      total_market_value: 85000000,
      league: { name: "HNL" },
      founded_at: "1911",
      stadium_name: "Stadion Maksimir",
      capacity: 35000,
    },
    {
      id: 2,
      name: "Hajduk Split",
      city: "Split",
      country: "Hrvatska",
      total_market_value: 45000000,
      league: { name: "HNL" },
      founded_at: "1911",
      stadium_name: "Stadion Poljud",
      capacity: 35000,
    },
    {
      id: 3,
      name: "Rijeka",
      city: "Rijeka",
      country: "Hrvatska",
      total_market_value: 25000000,
      league: { name: "HNL" },
      founded_at: "1946",
      stadium_name: "Stadion Rujevica",
      capacity: 8200,
    },
    {
      id: 4,
      name: "Osijek",
      city: "Osijek",
      country: "Hrvatska",
      total_market_value: 18000000,
      league: { name: "HNL" },
      founded_at: "1947",
      stadium_name: "Stadion Gradski vrt",
      capacity: 18000,
    },
  ]);

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white mb-2">Clubs</h1>
        <p className="text-gray-400">Overview of all football clubs</p>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="card-premium p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">

              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
                  <input
                    type="text"
                    placeholder="Search clubs..."
                    className="input-field pl-12"
                  />
                </div>
                <button className="btn-secondary flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="stat-card-premium">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Total Clubs</p>
                    <p className="text-3xl font-semibold text-white">156</p>
                  </div>
                  <Trophy className="w-10 h-10 text-gray-400 opacity-30" />
                </div>
            </div>
            <div className="stat-card-premium">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Total Value</p>
                  <p className="text-3xl font-semibold text-white">€2.5B</p>
                </div>
                <TrendingUp className="w-10 h-10 text-gray-400 opacity-30" />
              </div>
            </div>
            <div className="stat-card-premium">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Active Leagues</p>
                  <p className="text-3xl font-semibold text-white">24</p>
                </div>
                <Trophy className="w-10 h-10 text-gray-400 opacity-30" />
              </div>
            </div>
          </div>

          {/* Clubs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-[#2a2a2a] rounded-md hover:bg-[#2a2a2a] text-gray-300 font-medium transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 font-medium transition-colors">
                1
              </button>
              <button className="px-4 py-2 border border-[#2a2a2a] rounded-md hover:bg-[#2a2a2a] text-gray-300 font-medium transition-colors">
                2
              </button>
              <button className="px-4 py-2 border border-[#2a2a2a] rounded-md hover:bg-[#2a2a2a] text-gray-300 font-medium transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

