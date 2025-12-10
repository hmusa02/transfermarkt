import { MapPin, TrendingUp, Euro } from 'lucide-react';

export default function PlayerCard({ player }) {
  return (
    <div className="card p-5 cursor-pointer">
      <div className="flex items-start space-x-4">
        {/* Player Image */}
        <div className="w-14 h-14 player-avatar rounded-lg flex items-center justify-center text-sm font-semibold flex-shrink-0">
          {player.first_name[0]}{player.last_name[0]}
        </div>

        {/* Player Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base text-white mb-1.5 truncate">
            {player.first_name} {player.last_name}
          </h3>
          <div className="flex items-center text-sm text-gray-400 mb-3 flex-wrap gap-2">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate max-w-[140px]">{player.club?.name || 'Free agent'}</span>
            <span>•</span>
            <span className="px-2 py-0.5 bg-[#2a2a2a] text-gray-300 rounded text-xs font-medium flex-shrink-0">{player.position}</span>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center flex-shrink-0">
              <Euro className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
              <span className="font-semibold text-sm text-white whitespace-nowrap">
                {player.market_value ? `€${(player.market_value / 1000000).toFixed(1)}M` : 'N/A'}
              </span>
            </div>
            {player.quality_index && (
              <div className="flex items-center flex-shrink-0">
                <TrendingUp className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-300 whitespace-nowrap">{player.quality_index}/99</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

