import { useState } from "react";
import { Users, Briefcase, Building2, Mail, Phone } from "lucide-react";

export default function StaffAgencies() {
  const [staff] = useState([
    {
      id: 1,
      name: "Zlatko Dalić",
      role: "Coach",
      club: "Hrvatska",
      nationality: "HR",
      contract_until: "2026",
    },
    {
      id: 2,
      name: "Igor Bišćan",
      role: "Assistant Coach",
      club: "Dinamo Zagreb",
      nationality: "HR",
      contract_until: "2025",
    },
  ]);

  const [agencies] = useState([
    {
      id: 1,
      name: "CAA Base",
      country: "UK",
      clients_count: 150,
      email: "info@caabase.com",
      website: "www.caabase.com",
    },
    {
      id: 2,
      name: "Stellar Group",
      country: "UK",
      clients_count: 200,
      email: "contact@stellargroup.com",
      website: "www.stellargroup.com",
    },
  ]);

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white mb-2">Staff & Agencies</h1>
        <p className="text-gray-400">Overview of coaches, managers and agencies</p>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Staff Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Staff ({staff.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staff.map((member) => (
                <div key={member.id} className="card-premium p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 player-avatar rounded-lg flex items-center justify-center text-white text-lg font-semibold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 text-white">{member.name}</h3>
                      <p className="text-sm text-gray-400 mb-2">
                        <span className="font-medium">{member.role}</span> • {member.club}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-400">
                          Nationality: <span className="font-medium text-white">{member.nationality}</span>
                        </span>
                        <span className="text-gray-400">
                          Contract until: <span className="font-medium text-white">{member.contract_until}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Agencies Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">
              Agencies ({agencies.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agencies.map((agency) => (
                <div key={agency.id} className="card-premium p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-white">{agency.name}</h3>
                      <p className="text-sm text-gray-400">{agency.country}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-semibold text-white">
                        {agency.clients_count}
                      </div>
                      <div className="text-xs text-gray-400">Clients</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-400">
                      <Mail className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      {agency.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Phone className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <a href={`https://${agency.website}`} className="text-sky-500 hover:text-yellow-700 hover:underline font-medium transition-colors">
                        {agency.website}
                      </a>
                    </div>
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

