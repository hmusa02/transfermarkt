import { useState } from "react";
import { Bell, Check, CheckCheck, Settings, Trash2, RefreshCw, TrendingUp, DollarSign } from "lucide-react";

export default function Notifications() {
  const [notifications] = useState([
    {
      id: 1,
      type: "transfer",
      title: "New transfer",
      message: "Luka Modrić has moved to AC Milan",
      read: false,
      created_at: "2025-01-15 10:30",
      icon: RefreshCw,
      iconColor: "text-blue-500",
    },
    {
      id: 2,
      type: "watchlist",
      title: "Watchlist update",
      message: "Joško Gvardiol has changed value",
      read: false,
      created_at: "2025-01-15 09:15",
      icon: TrendingUp,
      iconColor: "text-red-500",
    },
    {
      id: 3,
      type: "match",
      title: "Match starting soon",
      message: "Dinamo Zagreb vs Hajduk Split in 2 hours",
      read: true,
      created_at: "2025-01-14 18:00",
      icon: Bell,
      iconColor: "text-white",
    },
    {
      id: 4,
      type: "valuation",
      title: "Value change",
      message: "Mateo Kovačić value increased to €35M",
      read: true,
      created_at: "2025-01-14 14:20",
      icon: DollarSign,
      iconColor: "text-yellow-500",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-2 flex items-center">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-3 px-3 py-1 bg-pink-500/20 text-pink-300 text-sm rounded-full font-semibold border border-pink-500/30">
                  {unreadCount} new
                </span>
              )}
            </h1>
            <p className="text-gray-400">Track all important events and updates</p>
          </div>
          <div className="flex space-x-2">
            <button className="btn-secondary flex items-center space-x-2">
              <CheckCheck className="w-5 h-5" />
              <span>Mark all as read</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Notifications List */}
          <div className="space-y-3">
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`rounded-xl border border-[#2a2a2a] p-5 transition-all ${
                    !notification.read
                      ? "bg-amber-900/20 border-amber-700/30"
                      : "bg-[#1a1a1a]"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className={`w-5 h-5 ${notification.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1 text-white">
                            {notification.title}
                          </h3>
                          <p className="text-gray-400 mb-2">
                            {notification.message}
                          </p>
                          <span className="text-sm text-gray-500">
                            {notification.created_at}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          {!notification.read && (
                            <button className="w-8 h-8 flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
                              <Check className="w-4 h-4 text-white" />
                            </button>
                          )}
                          <button className="w-8 h-8 flex items-center justify-center bg-red-600 hover:bg-red-700 rounded-md transition-colors">
                            <Trash2 className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State (ako nema notifikacija) */}
          {notifications.length === 0 && (
            <div className="card-premium p-12 text-center">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2 text-white">No notifications</h3>
              <p className="text-gray-400">
                When you have new notifications, they will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

