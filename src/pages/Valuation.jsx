import { useState } from "react";
import { TrendingUp, TrendingDown, Euro, BarChart3, Calendar } from "lucide-react";

export default function Valuation() {
  const [valuations] = useState([
    {
      id: 1,
      player: "Joško Gvardiol",
      current_value: 75000000,
      previous_value: 65000000,
      change_percent: 15.4,
      trend: "up",
      history: [
        { date: "2024-07", value: 50000000 },
        { date: "2024-09", value: 60000000 },
        { date: "2024-11", value: 65000000 },
        { date: "2025-01", value: 75000000 },
      ],
    },
    {
      id: 2,
      player: "Luka Modrić",
      current_value: 10000000,
      previous_value: 12000000,
      change_percent: -16.7,
      trend: "down",
      history: [
        { date: "2024-07", value: 15000000 },
        { date: "2024-09", value: 13000000 },
        { date: "2024-11", value: 12000000 },
        { date: "2025-01", value: 10000000 },
      ],
    },
    {
      id: 3,
      player: "Mateo Kovačić",
      current_value: 35000000,
      previous_value: 35000000,
      change_percent: 0,
      trend: "stable",
      history: [
        { date: "2024-07", value: 30000000 },
        { date: "2024-09", value: 32000000 },
        { date: "2024-11", value: 35000000 },
        { date: "2025-01", value: 35000000 },
      ],
    },
  ]);

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white mb-2">Valuation Engine</h1>
        <p className="text-gray-400">Tracking and analysis of player market values</p>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="stat-card-premium text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-gray-400" />
              <div className="text-3xl font-semibold text-white mb-2">€2.5B</div>
              <div className="text-gray-400 text-sm">Total value</div>
            </div>
            <div className="stat-card-premium text-center">
              <BarChart3 className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <div className="text-3xl font-semibold text-white mb-2">+12.5%</div>
              <div className="text-gray-400 text-sm">Average change</div>
            </div>
            <div className="stat-card-premium text-center">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <div className="text-3xl font-semibold text-white mb-2">156</div>
              <div className="text-gray-400 text-sm">Updated this month</div>
            </div>
            <div className="stat-card-premium text-center">
              <Euro className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <div className="text-3xl font-semibold text-white mb-2">€90M</div>
              <div className="text-gray-400 text-sm">Highest value</div>
            </div>
          </div>

          {/* Valuations List */}
          <div className="space-y-4">
            {valuations.map((valuation) => (
              <div key={valuation.id} className="card-premium p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-white">{valuation.player}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>
                        Current: <span className="font-semibold text-white">€{(valuation.current_value / 1000000).toFixed(1)}M</span>
                      </span>
                      <span>
                        Previous: <span className="font-medium text-gray-300">€{(valuation.previous_value / 1000000).toFixed(1)}M</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {valuation.trend === "up" ? (
                      <TrendingUp className="w-6 h-6 text-sky-500" />
                    ) : valuation.trend === "down" ? (
                      <TrendingDown className="w-6 h-6 text-red-500" />
                    ) : (
                      <BarChart3 className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    )}
                    <span
                      className={`text-lg font-semibold ${
                        valuation.trend === "up"
                          ? "text-sky-500"
                          : valuation.trend === "down"
                          ? "text-red-600"
                          : "text-gray-400"
                      }`}
                    >
                      {valuation.change_percent > 0 ? "+" : ""}
                      {valuation.change_percent.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* History Chart */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-400 mb-3 font-medium">Value history</p>
                  <div className="flex items-end space-x-2 h-24">
                    {valuation.history.map((point, index) => {
                      const maxValue = Math.max(...valuation.history.map((p) => p.value));
                      const height = (point.value / maxValue) * 100;
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div
                            className={`w-full rounded-t ${
                              valuation.trend === "up"
                                ? "bg-yellow-50 dark:bg-yellow-900/300"
                                : valuation.trend === "down"
                                ? "bg-red-50 dark:bg-red-900/300"
                                : "bg-gray-400"
                            }`}
                            style={{ height: `${height}%` }}
                          ></div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {point.date.split("-")[1]}/{point.date.split("-")[0].slice(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

