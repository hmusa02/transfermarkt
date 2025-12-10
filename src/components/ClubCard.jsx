import { MapPin, Users, Trophy } from "lucide-react";

export default function ClubCard({ club }) {
  return (
    <div className="card p-5 cursor-pointer">
      <div className="flex items-start space-x-4">
        {/* Club Logo */}
        <div className="w-14 h-14 club-logo rounded-lg flex items-center justify-center text-sm font-semibold flex-shrink-0">
          {club.name.substring(0, 2).toUpperCase()}
        </div>

        {/* Club Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base text-white mb-1.5">
            {club.name}
          </h3>
          <div className="flex items-center text-sm text-gray-400 mb-3">
            <MapPin className="w-3.5 h-3.5 mr-1.5" />
            {club.city}, {club.country}
          </div>

          <div className="flex items-center gap-4 mt-3 flex-wrap">
            {club.league && (
              <div className="flex items-center">
                <Trophy className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                <span className="font-medium text-sm text-gray-300">{club.league.name}</span>
              </div>
            )}
            {club.total_market_value && (
              <div className="flex items-center">
                <Users className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                <span className="font-semibold text-sm text-white">
                  {(club.total_market_value / 1000000).toFixed(1)}M €
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
