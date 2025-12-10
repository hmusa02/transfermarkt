import { useState } from "react";
import PlayerCard from "../components/PlayerCard";
import ClubCard from "../components/ClubCard";
import { Heart, Eye, Bell, Filter } from "lucide-react";

export default function Watchlist() {
  const [watchlistItems] = useState([
    {
      id: 1,
      type: "player",
      player: {
        id: 1,
        first_name: "Luka",
        last_name: "Modrić",
        position: "MF",
        market_value: 10000000,
        quality_index: 88,
        club: { name: "Real Madrid" },
      },
      added_at: "2025-01-10",
    },
    {
      id: 2,
      type: "player",
      player: {
        id: 3,
        first_name: "Joško",
        last_name: "Gvardiol",
        position: "DF",
        market_value: 75000000,
        quality_index: 87,
        club: { name: "Manchester City" },
      },
      added_at: "2025-01-08",
    },
    {
      id: 3,
      type: "club",
      club: {
        id: 1,
        name: "Dinamo Zagreb",
        city: "Zagreb",
        country: "Hrvatska",
        total_market_value: 85000000,
        league: { name: "HNL" },
      },
      added_at: "2025-01-05",
    },
  ]);

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white mb-2">My Watchlist</h1>
        <p className="text-gray-400">Track your favorite players and clubs</p>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Filters */}
          <div className="card-premium p-6 mb-6">
            <button className="btn-secondary flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="stat-card-premium text-center">
              <Heart className="w-8 h-8 mx-auto mb-3 text-red-500" />
              <div className="text-3xl font-semibold text-white mb-2">
                {watchlistItems.length}
              </div>
              <div className="text-gray-400 text-sm">Total items</div>
            </div>
            <div className="stat-card-premium text-center">
              <Eye className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <div className="text-3xl font-semibold text-white mb-2">
                {watchlistItems.filter((item) => item.type === "player").length}
              </div>
              <div className="text-gray-400 text-sm">Players</div>
            </div>
            <div className="stat-card-premium text-center">
              <Bell className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <div className="text-3xl font-semibold text-white mb-2">12</div>
              <div className="text-gray-400 text-sm">Notifications</div>
            </div>
          </div>

          {/* Watchlist Items */}
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">
                Players ({watchlistItems.filter((item) => item.type === "player").length})
              </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {watchlistItems
                    .filter((item) => item.type === "player")
                    .map((item) => (
                      <div key={item.id} className="relative">
                        <PlayerCard player={item.player} />
                        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 dark:bg-red-900/30 text-red-500 transition-colors border border-red-200">
                          <Heart className="w-5 h-5 fill-red-500" />
                        </button>
                      </div>
                    ))}
                </div>
              </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">
                Clubs ({watchlistItems.filter((item) => item.type === "club").length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {watchlistItems
                  .filter((item) => item.type === "club")
                  .map((item) => (
                    <div key={item.id} className="relative">
                      <ClubCard club={item.club} />
                      <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 dark:bg-red-900/30 text-red-500 transition-colors border border-red-200">
                        <Heart className="w-5 h-5 fill-red-500" />
                      </button>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

