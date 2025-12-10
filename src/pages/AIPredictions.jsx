import { useState } from "react";
import { Brain, TrendingUp, TrendingDown, Minus, BarChart3, Sparkles } from "lucide-react";

export default function AIPredictions() {
  const [predictions] = useState([
    {
      id: 1,
      player: {
        name: "Luka Modrić",
        age: 38,
        position: "MF",
        club: "Real Madrid",
      },
      potential_score: 85,
      trajectory: "plateau",
      confidence: 0.92,
      horizon_months: 12,
      projection_curve: [88, 87, 86, 85, 84, 83],
    },
    {
      id: 2,
      player: {
        name: "Joško Gvardiol",
        age: 22,
        position: "DF",
        club: "Manchester City",
      },
      potential_score: 92,
      trajectory: "up",
      confidence: 0.95,
      horizon_months: 12,
      projection_curve: [87, 88, 89, 90, 91, 92],
    },
    {
      id: 3,
      player: {
        name: "Mateo Kovačić",
        age: 29,
        position: "MF",
        club: "Manchester City",
      },
      potential_score: 88,
      trajectory: "up",
      confidence: 0.88,
      horizon_months: 12,
      projection_curve: [85, 86, 87, 87, 88, 88],
    },
  ]);

  const getTrajectoryIcon = (trajectory) => {
    switch (trajectory) {
      case "up":
        return <TrendingUp className="w-5 h-5 text-sky-500" />;
      case "down":
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      default:
        return <Minus className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getTrajectoryColor = (trajectory) => {
    switch (trajectory) {
      case "up":
        return "text-sky-500";
      case "down":
        return "text-red-600";
      default:
        return "text-yellow-400";
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white mb-2">AI Development Predictions</h1>
        <p className="text-gray-400">Advanced analytics and player development predictions using machine learning</p>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center space-x-2 px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md">
            <Sparkles className="w-5 h-5 text-gray-400" />
            <span className="font-medium text-sm text-gray-300">89% Accuracy</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md">
            <BarChart3 className="w-5 h-5 text-gray-400" />
            <span className="font-medium text-sm text-gray-300">1,234 Predictions</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md">
            <Brain className="w-5 h-5 text-gray-400" />
            <span className="font-medium text-sm text-gray-300">ML Model v2.1</span>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Predictions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {predictions.map((prediction) => (
              <div key={prediction.id} className="card-premium p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-white">
                      {prediction.player.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {prediction.player.position} • {prediction.player.club} • {prediction.player.age} years
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTrajectoryIcon(prediction.trajectory)}
                    <span className={`font-semibold ${getTrajectoryColor(prediction.trajectory)}`}>
                      {prediction.trajectory === "up" ? "Rising" : prediction.trajectory === "down" ? "Declining" : "Stable"}
                    </span>
                  </div>
                </div>

                {/* Potential Score */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400 font-medium">Potential Score</span>
                    <span className="text-xl font-semibold text-white">
                      {prediction.potential_score}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-yellow-50 dark:bg-yellow-900/300 h-3 rounded-full"
                      style={{ width: `${prediction.potential_score}%` }}
                    ></div>
                  </div>
                </div>

                {/* Confidence */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400 font-medium">Confidence</span>
                    <span className="font-semibold text-white">
                      {(prediction.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-yellow-50 dark:bg-yellow-900/300 h-2 rounded-full"
                      style={{ width: `${prediction.confidence * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Projection Curve */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-400 mb-2 font-medium">
                    Projection for {prediction.horizon_months} months
                  </p>
                  <div className="flex items-end space-x-2 h-20">
                    {prediction.projection_curve.map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-yellow-50 dark:bg-yellow-900/300 rounded-t"
                          style={{ height: `${(value / 100) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{index + 1}M</span>
                      </div>
                    ))}
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

