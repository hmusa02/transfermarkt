import { useState } from "react";
import { Trophy, MapPin, TrendingUp, Users } from "lucide-react";

export default function Leagues() {
  const [leagues] = useState([
    {
      id: 1,
      name: "HNL",
      country: "Hrvatska",
      level: 1,
      type: "league",
      active: true,
      clubs_count: 10,
      total_value: 250000000,
    },
    {
      id: 2,
      name: "Premier League",
      country: "Engleska",
      level: 1,
      type: "league",
      active: true,
      clubs_count: 20,
      total_value: 12000000000,
    },
    {
      id: 3,
      name: "La Liga",
      country: "Španjolska",
      level: 1,
      type: "league",
      active: true,
      clubs_count: 20,
      total_value: 8500000000,
    },
    {
      id: 4,
      name: "Bundesliga",
      country: "Njemačka",
      level: 1,
      type: "league",
      active: true,
      clubs_count: 18,
      total_value: 7500000000,
    },
    {
      id: 5,
      name: "Serie A",
      country: "Italija",
      level: 1,
      type: "league",
      active: true,
      clubs_count: 20,
      total_value: 6500000000,
    },
    {
      id: 6,
      name: "Ligue 1",
      country: "Francuska",
      level: 1,
      type: "league",
      active: true,
      clubs_count: 20,
      total_value: 5500000000,
    },
  ]);

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white mb-2">Leagues</h1>
        <p className="text-gray-400">Overview of all football leagues and competitions</p>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">

            {/* Leagues Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leagues.map((league) => (
                <div
                  key={league.id}
                  className="card p-5 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                <h3 className="text-lg font-semibold hover:text-gray-300 transition-colors">
                  {league.name}
                </h3>
                <div className="flex items-center text-sm text-gray-400 mt-1">
                  <MapPin className="w-4 h-4 mr-2" />
                  {league.country}
                </div>
              </div>
              <span className="px-3 py-1 bg-[#2a2a2a] text-gray-300 text-xs font-medium rounded-md">
                Active
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Level:</span>
                <span className="font-medium text-white">{league.level}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Clubs:
                </span>
                <span className="font-medium text-white">{league.clubs_count}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Total value:</span>
                <span className="font-semibold text-white">
                  €{(league.total_value / 1000000000).toFixed(1)}B
                </span>
              </div>
            </div>

            <button className="mt-4 w-full btn-primary text-sm">
              View details →
            </button>
          </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

