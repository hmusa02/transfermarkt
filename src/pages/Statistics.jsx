import { useState } from "react";
import { BarChart3, TrendingUp, Award, Target } from "lucide-react";

export default function Statistics() {
  const [topScorers] = useState([
    { rank: 1, player: "Luka Modrić", goals: 12, assists: 8, club: "Real Madrid" },
    { rank: 2, player: "Mateo Kovačić", goals: 10, assists: 6, club: "Manchester City" },
    { rank: 3, player: "Joško Gvardiol", goals: 8, assists: 2, club: "Manchester City" },
    { rank: 4, player: "Marcelo Brozović", goals: 7, assists: 5, club: "Al-Nassr" },
    { rank: 5, player: "Dominik Livaković", goals: 0, assists: 0, club: "Fenerbahçe", position: "GK" },
  ]);

  const [topAssists] = useState([
    { rank: 1, player: "Luka Modrić", assists: 12, goals: 8, club: "Real Madrid" },
    { rank: 2, player: "Mateo Kovačić", assists: 10, goals: 6, club: "Manchester City" },
    { rank: 3, player: "Marcelo Brozović", assists: 9, goals: 5, club: "Al-Nassr" },
    { rank: 4, player: "Joško Gvardiol", assists: 4, goals: 2, club: "Manchester City" },
    { rank: 5, player: "Ivan Perišić", assists: 7, goals: 3, club: "Hajduk Split" },
  ]);

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white mb-2">Statistics</h1>
        <p className="text-gray-400">Detailed statistics and analytics for players and clubs</p>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="stat-card-premium text-center">
              <Target className="w-8 h-8 mx-auto mb-3 text-gray-400" />
              <div className="text-3xl font-semibold text-white mb-2">1,234</div>
              <div className="text-gray-400 text-sm">Total goals</div>
            </div>
            <div className="stat-card-premium text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <div className="text-3xl font-semibold text-white mb-2">856</div>
              <div className="text-gray-400 text-sm">Assists</div>
            </div>
            <div className="stat-card-premium text-center">
              <Award className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <div className="text-3xl font-semibold text-white mb-2">89%</div>
              <div className="text-gray-400 text-sm">Average accuracy</div>
            </div>
            <div className="stat-card-premium text-center">
              <BarChart3 className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <div className="text-3xl font-semibold text-white mb-2">2.5M</div>
              <div className="text-gray-400 text-sm">Total minutes</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Scorers */}
            <div className="card-premium p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Top Scorers
              </h2>
                <div className="space-y-3">
                  {topScorers.map((scorer) => (
                    <div
                      key={scorer.rank}
                      className="flex items-center justify-between p-3 hover:bg-[#2a2a2a] rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold ${
                            scorer.rank === 1
                              ? "bg-yellow-50 dark:bg-yellow-900/300 text-white"
                              : scorer.rank === 2
                              ? "bg-gray-300 dark:bg-gray-600 text-white"
                              : scorer.rank === 3
                              ? "bg-orange-400 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-300"
                          }`}
                        >
                          {scorer.rank}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{scorer.player}</div>
                          <div className="text-sm text-gray-400">{scorer.club}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white">{scorer.goals}</div>
                        <div className="text-xs text-gray-400">goals</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            {/* Top Assists */}
            <div className="card-premium p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Top Assists
              </h2>
                <div className="space-y-3">
                  {topAssists.map((assist) => (
                    <div
                      key={assist.rank}
                      className="flex items-center justify-between p-3 hover:bg-[#2a2a2a] rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold ${
                            assist.rank === 1
                              ? "bg-yellow-50 dark:bg-yellow-900/300 text-white"
                              : assist.rank === 2
                              ? "bg-gray-300 dark:bg-gray-600 text-white"
                              : assist.rank === 3
                              ? "bg-orange-400 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-300"
                          }`}
                        >
                          {assist.rank}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{assist.player}</div>
                          <div className="text-sm text-gray-400">{assist.club}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white">{assist.assists}</div>
                        <div className="text-xs text-gray-400">assists</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Advanced Stats */}
          <div className="card-premium p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Advanced Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#2a2a2a] rounded-lg border border-[#2a2a2a]">
                <div className="text-sm text-gray-400 mb-1">Average xG</div>
                <div className="text-2xl font-semibold text-white">1.85</div>
              </div>
              <div className="p-4 bg-[#2a2a2a] rounded-lg border border-[#2a2a2a]">
                <div className="text-sm text-gray-400 mb-1">Average xA</div>
                <div className="text-2xl font-semibold text-white">0.92</div>
              </div>
              <div className="p-4 bg-[#2a2a2a] rounded-lg border border-[#2a2a2a]">
                <div className="text-sm text-gray-400 mb-1">Average possession</div>
                <div className="text-2xl font-semibold text-white">62%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

