import { useState } from "react";
import { Calendar, Clock, Trophy, ArrowRight } from "lucide-react";

export default function Matches() {
  const [matches] = useState([
    {
      id: 1,
      home_club: "Dinamo Zagreb",
      away_club: "Hajduk Split",
      home_score: 2,
      away_score: 1,
      status: "finished",
      kickoff_at: "2025-01-15 18:00",
      league: "HNL",
    },
    {
      id: 2,
      home_club: "Real Madrid",
      away_club: "Barcelona",
      home_score: null,
      away_score: null,
      status: "scheduled",
      kickoff_at: "2025-01-16 20:00",
      league: "La Liga",
    },
    {
      id: 3,
      home_club: "Manchester City",
      away_club: "Liverpool",
      home_score: 1,
      away_score: 1,
      status: "live",
      kickoff_at: "2025-01-15 16:30",
      league: "Premier League",
    },
    {
      id: 4,
      home_club: "Bayern Munich",
      away_club: "Borussia Dortmund",
      home_score: null,
      away_score: null,
      status: "scheduled",
      kickoff_at: "2025-01-17 19:30",
      league: "Bundesliga",
    },
    {
      id: 5,
      home_club: "Juventus",
      away_club: "AC Milan",
      home_score: 3,
      away_score: 0,
      status: "finished",
      kickoff_at: "2025-01-14 20:45",
      league: "Serie A",
    },
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "live":
        return (
          <span className="px-3 py-1 bg-red-900/30 text-red-400 border border-red-700 text-xs font-semibold rounded-md animate-pulse">
            LIVE
          </span>
        );
      case "finished":
        return (
          <span className="px-3 py-1 bg-[#2a2a2a] text-gray-300 border border-[#2a2a2a] text-xs font-semibold rounded-md">
            Finished
          </span>
        );
      case "scheduled":
        return (
          <span className="px-3 py-1 bg-green-900/30 text-sky-300 border border-sky-600 text-xs font-semibold rounded-md">
            Scheduled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white mb-2">Matches</h1>
        <p className="text-gray-400">Overview of all matches and results</p>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Filters */}
          <div className="card-premium p-6 mb-6">
            <div className="flex flex-wrap gap-3">
              <button className="btn-primary text-sm">
                All
              </button>
              <button className="btn-secondary text-sm">
                Live
              </button>
              <button className="btn-secondary text-sm">
                Scheduled
              </button>
              <button className="btn-secondary text-sm">
                Finished
              </button>
            </div>
          </div>

          {/* Matches List */}
          <div className="space-y-4">
            {matches.map((match) => (
              <div
                key={match.id}
                className="card-premium p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{new Date(match.kickoff_at).toLocaleDateString("en-US")}</span>
                    <Clock className="w-4 h-4 ml-4 text-gray-500" />
                    <span>
                      {new Date(match.kickoff_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400 font-medium">{match.league}</span>
                    {getStatusBadge(match.status)}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {/* Home Team */}
                  <div className="flex-1 flex items-center justify-end space-x-3">
                    <span className="font-semibold text-white">{match.home_club}</span>
                    <div className="w-10 h-10 player-avatar rounded-lg flex items-center justify-center text-white font-semibold">
                      {match.home_club.substring(0, 2).toUpperCase()}
                    </div>
                  </div>

                  {/* Score */}
                  <div className="flex items-center space-x-4 mx-8">
                    {match.status === "finished" || match.status === "live" ? (
                      <>
                        <span className="text-2xl font-bold text-white">
                          {match.home_score}
                        </span>
                        <span className="text-gray-400">-</span>
                        <span className="text-2xl font-bold text-white">
                          {match.away_score}
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-400 font-semibold">vs</span>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="flex-1 flex items-center space-x-3">
                    <div className="w-10 h-10 player-avatar rounded-lg flex items-center justify-center text-white font-semibold">
                      {match.away_club.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-semibold text-white">{match.away_club}</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button className="text-sm text-sky-500 hover:text-sky-600 hover:underline flex items-center font-medium transition-colors">
                    View details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-[#2a2a2a] rounded-md hover:bg-[#2a2a2a] text-gray-300 font-medium transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 font-medium transition-colors">
                1
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

