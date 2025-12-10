import { useState } from "react";
import { FolderOpen, Users, Share2, Download, Plus } from "lucide-react";

export default function Scouting() {
  const [shortlists] = useState([
    {
      id: 1,
      name: "Hrvatski talenti",
      description: "Najbolji mladi hrvatski igrači",
      item_count: 12,
      created_at: "2025-01-10",
      shared: true,
    },
    {
      id: 2,
      name: "Defanzivci za transfer",
      description: "Potencijalni defanzivci za ljetni transfer",
      item_count: 8,
      created_at: "2025-01-08",
      shared: false,
    },
    {
      id: 3,
      name: "MLS scouting",
      description: "Igrači iz MLS lige za potencijalni transfer",
      item_count: 15,
      created_at: "2025-01-05",
      shared: true,
    },
  ]);

  const [packages] = useState([
    {
      id: 1,
      name: "Paket za Dinamo Zagreb",
      status: "active",
      deadline: "2025-02-15",
      assigned_to: "Scout Team A",
      players_count: 25,
    },
    {
      id: 2,
      name: "HNL Scouting Q1",
      status: "pending",
      deadline: "2025-03-01",
      assigned_to: "Scout Team B",
      players_count: 40,
    },
  ]);

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-2">Scouting & Shortlists</h1>
            <p className="text-gray-400">Organize your scouting lists and packages</p>
          </div>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>New Shortlist</span>
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Shortlists Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">
              My Shortlists ({shortlists.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shortlists.map((shortlist) => (
                <div key={shortlist.id} className="card-premium p-5 cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 text-white">{shortlist.name}</h3>
                      <p className="text-sm text-gray-400 mb-3">{shortlist.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
                          {shortlist.item_count} players
                        </div>
                        {shortlist.shared && (
                          <div className="flex items-center text-sky-500">
                            <Share2 className="w-4 h-4 mr-1" />
                            Shared
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 btn-secondary text-sm">Open</button>
                    <button className="px-3 py-2 border border-[#2a2a2a] rounded-md hover:bg-[#2a2a2a] text-gray-300 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Scouting Packages Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">
              Scouting Packages ({packages.length})
            </h2>
            <div className="space-y-4">
              {packages.map((pkg) => (
                <div key={pkg.id} className="card-premium p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg text-white">{pkg.name}</h3>
                        <span
                          className={`px-3 py-1 rounded-md text-xs font-semibold ${
                            pkg.status === "active"
                              ? "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 border border-yellow-200"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-300 border border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          {pkg.status === "active" ? "Active" : "Pending"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-400">
                        <div>
                          <span className="font-medium">Deadline:</span> {pkg.deadline}
                        </div>
                        <div>
                          <span className="font-medium">Assigned:</span> {pkg.assigned_to}
                        </div>
                        <div>
                          <span className="font-medium">Players:</span> {pkg.players_count}
                        </div>
                      </div>
                    </div>
                    <button className="btn-primary">Details</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

