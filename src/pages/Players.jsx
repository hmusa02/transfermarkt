import { useState } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

export default function Players() {
  const [players] = useState([
    { id: 1, name: 'Luka Modrić', position: 'MF', club: 'Real Madrid', value: 10000000, age: 38, country: 'HR' },
    { id: 2, name: 'Mateo Kovačić', position: 'MF', club: 'Manchester City', value: 35000000, age: 29, country: 'HR' },
    { id: 3, name: 'Joško Gvardiol', position: 'DF', club: 'Manchester City', value: 75000000, age: 22, country: 'HR' },
    { id: 4, name: 'Marcelo Brozović', position: 'MF', club: 'Al-Nassr', value: 20000000, age: 31, country: 'HR' },
    { id: 5, name: 'Dominik Livaković', position: 'GK', club: 'Fenerbahçe', value: 12000000, age: 29, country: 'HR' },
  ]);

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white mb-2">Players</h1>
        <p className="text-gray-400">Overview of all football players</p>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Filters */}
          <div className="card-premium p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
                <input
                  type="text"
                  placeholder="Search players..."
                  className="input-field pl-12"
                />
              </div>
              <button className="btn-secondary flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Players Table */}
          <div className="card-premium overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        <button className="flex items-center space-x-2 hover:text-white transition-colors">
                          <span>Player</span>
                          <ArrowUpDown className="w-4 h-4" />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Club
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        <button className="flex items-center space-x-1 hover:text-white transition-colors">
                          <span>Value</span>
                          <ArrowUpDown className="w-4 h-4" />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Country
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2a2a]">
                    {players.map((player) => (
                      <tr key={player.id} className="table-row cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 player-avatar rounded-lg flex items-center justify-center text-white font-bold mr-3">
                              {player.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="font-medium text-white hover:text-gray-300 transition-colors">
                              {player.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 text-xs font-medium rounded bg-[#2a2a2a] text-gray-300">
                            {player.position}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 font-medium">
                          {player.club}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-semibold text-white">
                            €{(player.value / 1000000).toFixed(1)}M
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 font-medium">
                          {player.age}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-xl">{player.country === 'HR' ? '🇭🇷' : '🌍'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="bg-[#1a1a1a] px-6 py-4 border-t border-[#2a2a2a] flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Showing 1-5 of 10,234 players
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-2 border border-[#2a2a2a] rounded-md hover:bg-[#2a2a2a] text-gray-300 font-medium transition-colors">
                    Previous
                  </button>
                  <button className="px-3 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 font-medium transition-colors">
                    1
                  </button>
                  <button className="px-3 py-2 border border-[#2a2a2a] rounded-md hover:bg-[#2a2a2a] text-gray-300 font-medium transition-colors">
                    2
                  </button>
                  <button className="px-3 py-2 border border-[#2a2a2a] rounded-md hover:bg-[#2a2a2a] text-gray-300 font-medium transition-colors">
                    3
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

