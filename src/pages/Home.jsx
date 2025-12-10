import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  Facebook,
  Instagram,
  Twitter,
  Music,
  Youtube,
  Send,
  MessageCircle,
  Linkedin,
} from "lucide-react";
import { searchApi } from "../services/searchApi";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [currentNewsPage, setCurrentNewsPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  // Mock data
  const [news] = useState([
    {
      id: 1,
      title: "Dinamo Zagreb struggles, can Hajduk use an opportunity?",
      time: "2h ago",
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop",
    },
    {
      id: 2,
      title: "Jagušić on fire, is 5M a realistic fee for Slaven Belupo?",
      time: "2h ago",
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop",
    },
    {
      id: 3,
      title: "The dream for Kovačević continues, what will happen in January?",
      time: "2h ago",
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop",
    },
  ]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSelectedPlayer(null);
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      // Search for players
      const results = await searchApi.full(searchQuery, {
        type: "player",
        limit: 5,
      });

      // Backend vraća podatke u formatu: { players: [], clubs: [], ... }
      // Ili direktno array ako je legacy format
      const players =
        results.players ||
        results.data ||
        (Array.isArray(results) ? results : []);

      console.log("Search results:", results); // Debug log

      if (players && players.length > 0) {
        // Use first result as selected player
        const firstPlayer = players[0];

        // Backend search vraća: { id, model_type, model_id, title, score }
        // Trebamo dohvatiti puni player objekt ako je moguće
        setSelectedPlayer({
          id: firstPlayer.model_id || firstPlayer.id,
          name: firstPlayer.title || firstPlayer.full_name || firstPlayer.name,
          position:
            firstPlayer.position || firstPlayer.position_primary || "MF",
          club: firstPlayer.club?.name || firstPlayer.club_name || "N/A",
          value: firstPlayer.market_value
            ? `${firstPlayer.market_value.toLocaleString()} EUR`
            : "N/A",
          form: firstPlayer.quality_index
            ? (firstPlayer.quality_index / 10).toFixed(1)
            : "N/A",
          minutes: "880'",
          lastGames: "last 10 games",
          ratingTrend: "+ 0.21",
          avgRatingTrend: "Avg. rating trend",
        });
        setSearchResults(players);
      } else {
        setSelectedPlayer(null);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      console.error("Error details:", error.response?.data || error.message);

      // Show user-friendly error message
      if (
        error.code === "ERR_NETWORK" ||
        error.message.includes("Network Error")
      ) {
        console.warn("Backend nije pokrenut! Provjeri da li TransferHub backend radi na http://localhost:8000");
      } else if (error.response?.status === 404) {
        alert(
          "Search API endpoint nije pronađen. Provjeri da li su API rute registrirane."
        );
      } else {
        alert(
          "Greška pri pretrazi: " +
            (error.response?.data?.message || error.message)
        );
      }

      setSelectedPlayer(null);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Load initial data on mount and handle URL search param
  useEffect(() => {
    const urlSearch = searchParams.get("search");
    console.log("useEffect triggered, urlSearch:", urlSearch);
    
    // Update search query in input field
    if (urlSearch) {
      setSearchQuery(urlSearch);
    } else {
      setSearchQuery("");
      setSelectedPlayer(null);
      setSearchResults([]);
      return;
    }
    
    console.log("About to perform search for:", urlSearch);

    // Trigger search automatically if URL has search param
    const performSearch = async () => {
      setLoading(true);
      try {
        console.log("=== SEARCH START ===");
        console.log("Performing search for:", urlSearch);
        console.log("API base URL:", import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api');
        console.log("Full API URL will be:", `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'}/v1/search?q=${urlSearch}&type=player&limit=5`);
        
        const results = await searchApi.full(urlSearch, {
          type: "player",
          limit: 5,
        });
        
        console.log("=== API RESPONSE RECEIVED ===");

        console.log("Search results:", results);
        console.log("Results type:", typeof results);
        console.log("Results.players:", results.players);

        const players =
          results.players ||
          results.data ||
          (Array.isArray(results) ? results : []);

        console.log("Extracted players:", players);
        console.log("Players length:", players.length);

        if (players && players.length > 0) {
          const firstPlayer = players[0];
          console.log("Setting selected player:", firstPlayer);
          setSelectedPlayer({
            id: firstPlayer.model_id || firstPlayer.id,
            name: firstPlayer.title || firstPlayer.full_name || firstPlayer.name,
            position:
              firstPlayer.position || firstPlayer.position_primary || "MF",
            club: firstPlayer.club?.name || firstPlayer.club_name || "N/A",
            value: firstPlayer.market_value
              ? `${firstPlayer.market_value.toLocaleString()} EUR`
              : "N/A",
            form: firstPlayer.quality_index
              ? (firstPlayer.quality_index / 10).toFixed(1)
              : "N/A",
            minutes: "880'",
            lastGames: "last 10 games",
            ratingTrend: "+ 0.21",
            avgRatingTrend: "Avg. rating trend",
          });
          setSearchResults(players);
          console.log("=== SELECTED PLAYER SET ===");
          console.log("Selected player:", selectedPlayer);
          console.log("Search results count:", searchResults.length);
        } else {
          console.log("=== NO PLAYERS FOUND ===");
          console.log("Results object:", results);
          console.log("Players array:", players);
          setSelectedPlayer(null);
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        console.error("Error details:", error.response?.data || error.message);
        console.error("Error stack:", error.stack);
        
        // Show user-friendly error message
        if (
          error.code === "ERR_NETWORK" ||
          error.message.includes("Network Error")
        ) {
          console.warn("Backend nije pokrenut! Provjeri da li Laravel backend radi.");
        } else if (error.response?.status === 404) {
          console.warn("Search API endpoint nije pronađen.");
        }
        
        setSelectedPlayer(null);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };
    
    if (urlSearch) {
      performSearch();
    }
  }, [searchParams]);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Welcome Hero Section */}
        <div className="mb-20">
          <p className="text-sm text-gray-400 mb-2">Welcome to TransferHub</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            All football data in one place
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Find out everything about our registered leagues and competitions
          </p>
          <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-3 flex items-center gap-2 max-w-xl">
            <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <form onSubmit={handleSearch} className="flex-1">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white placeholder:text-gray-500 text-sm"
                disabled={loading}
              />
            </form>
            {loading && (
              <div className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
        </div>

        {/* Latest News Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Latest news</h2>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentNewsPage(page)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    currentNewsPage === page
                      ? "bg-sky-500 text-white"
                      : "bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#2a2a2a]"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden hover:border-sky-500/50 transition-all cursor-pointer"
              >
                <div className="aspect-video bg-[#2a2a2a] relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Player Development Projectory Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">
            Player development projectory
          </h2>
          <p className="text-gray-400 mb-6 max-w-3xl">
            This is a tool to show you the trajectory of development based on
            recent form, general data and league/club data. Our powerful AI TOP
            shows the expected uplift or drop down of a certain player.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Player Search */}
            <div>
              <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-4 mb-4">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Eman"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSearch(e);
                      }
                    }}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              {selectedPlayer ? (
                <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-6">
                  {console.log("Rendering selectedPlayer:", selectedPlayer)}
                  <div className="flex items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        {selectedPlayer.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {selectedPlayer.position}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedPlayer.club}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Form</span>
                      <span className="text-sm font-semibold text-white">
                        {selectedPlayer.form}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        {selectedPlayer.minutes} {selectedPlayer.lastGames}
                      </span>
                      <span className="text-sm font-semibold text-sky-400">
                        {selectedPlayer.ratingTrend}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      {selectedPlayer.avgRatingTrend}
                    </div>
                    <div className="pt-3 border-t border-[#2a2a2a]">
                      <p className="text-lg font-bold text-white">
                        {selectedPlayer.value}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    {searchResults.length > 0
                      ? `${searchResults.length} player${
                          searchResults.length > 1 ? "s" : ""
                        } found in search`
                      : "No players found"}
                  </p>
                </div>
              ) : (
                <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-6 text-center">
                  {console.log("No selectedPlayer, showing placeholder. searchQuery:", searchQuery, "loading:", loading)}
                  <p className="text-gray-500 text-sm">
                    {loading ? "Searching..." : "Search for a player to see their development trajectory"}
                  </p>
                </div>
              )}
            </div>

            {/* Right: Development Graph */}
            <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Career Forecast 2024-2025
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                form × minutes × difficulty index × age curve
              </p>
              {selectedPlayer ? (
                <div className="h-64 relative">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 800 200"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="forecastGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#0ea5e9"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="#0ea5e9"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    {[0, 100, 200, 300, 400, 500].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={200 - (y / 500) * 200}
                        x2="800"
                        y2={200 - (y / 500) * 200}
                        stroke="#2a2a2a"
                        strokeWidth="1"
                      />
                    ))}
                    {/* Y-axis labels */}
                    {[0, 100, 200, 300, 400, 500].map((y) => (
                      <text
                        key={y}
                        x="10"
                        y={200 - (y / 500) * 200 + 4}
                        fill="#666"
                        fontSize="10"
                      >
                        {y}
                      </text>
                    ))}
                    {/* Area under line */}
                    <path
                      d={`M 0,200 L 0,${200 - (180 / 500) * 200} L 400,${
                        200 - (270 / 500) * 200
                      } L 800,${200 - (480 / 500) * 200} L 800,200 Z`}
                      fill="url(#forecastGradient)"
                    />
                    {/* Line */}
                    <polyline
                      points={`0,${200 - (180 / 500) * 200} 400,${
                        200 - (270 / 500) * 200
                      } 800,${200 - (480 / 500) * 200}`}
                      fill="none"
                      stroke="#0ea5e9"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Data points */}
                    {[
                      { x: 0, y: 180 },
                      { x: 400, y: 270 },
                      { x: 800, y: 480 },
                    ].map((point, index) => (
                      <circle
                        key={index}
                        cx={point.x}
                        cy={200 - (point.y / 500) * 200}
                        r="5"
                        fill="#0ea5e9"
                        stroke="#1a1a1a"
                        strokeWidth="2"
                      />
                    ))}
                    {/* X-axis labels */}
                    <text x="0" y="195" fill="#666" fontSize="10">
                      Dec 24
                    </text>
                    <text x="380" y="195" fill="#666" fontSize="10">
                      Jun 25
                    </text>
                    <text x="760" y="195" fill="#666" fontSize="10">
                      Dec 25
                    </text>
                  </svg>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">
                    Select a player to view forecast
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Powered By Section */}
        <div className="mb-16 text-center">
          <p className="text-sm text-gray-400 mb-6">
            TransferHub is powered by
          </p>
          <div className="flex items-center justify-center flex-wrap gap-8 opacity-60">
            {[
              "an.no",
              "EA",
              "Puma",
              "amazon",
              "gpexe",
              "Santander",
              "IKEA",
              "EA",
              "Puma",
              "amazon",
              "gpexe",
              "Santander",
            ].map((brand, index) => (
              <div key={index} className="text-gray-400 text-sm font-medium">
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* My Sticky Bar Promotional Cards */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((card) => (
            <div
              key={card}
              className="bg-gradient-to-br from-sky-500/20 to-purple-500/20 rounded-lg border border-sky-500/30 p-6 relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-sky-400 mb-4">
                  My Sticky Bar
                </h3>
                <ul className="space-y-2 text-white text-sm mb-4">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Show notification bar countdown timer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Offer coupon codes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Add a contact form</span>
                  </li>
                </ul>
              </div>
              <div className="absolute right-4 top-4 w-32 h-20 bg-[#1a1a1a]/50 rounded border border-[#2a2a2a] blur-sm opacity-50"></div>
            </div>
          ))}
        </div>

        {/* Latest Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Latest</h2>
          <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-12 min-h-[300px] flex items-center justify-center">
            <p className="text-gray-500 text-sm">Instagram posts pasted here</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[#2a2a2a] pt-12 pb-8">
          <div className="flex flex-col items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-14 h-14 relative flex items-center justify-center overflow-hidden">
                {/* Official Puma logo */}
                <img
                  src="/puma-logo.png"
                  alt="Puma Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    console.error("Failed to load Puma logo");
                    e.target.style.display = "none";
                  }}
                />
              </div>
              <div className="w-px h-6 bg-white"></div>
              <div className="flex flex-col">
                <div className="text-white font-semibold text-sm tracking-tight">
                  ZONE
                </div>
                <div className="text-white font-semibold text-sm tracking-tight">
                  ZONE
                </div>
              </div>
            </div>

            {/* Central Information */}
            <div className="text-center mb-8">
              <p className="text-white text-sm mb-2">
                TransferHub football platform
              </p>
              <p className="text-gray-400 text-xs mb-2">
                All football data you need
              </p>
              <p className="text-white text-xs mb-1">info@transferhub.com</p>
              <p className="text-white text-xs mb-1">support@transferhub.com</p>
              <p className="text-white text-xs">transferhub.com</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center justify-between w-full max-w-4xl">
              {/* Left Group */}
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#333333] transition-colors"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#333333] transition-colors"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#333333] transition-colors"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#333333] transition-colors"
                >
                  <Music className="w-5 h-5 text-white" />
                </a>
              </div>

              {/* Right Group */}
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#333333] transition-colors"
                >
                  <Youtube className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#333333] transition-colors"
                >
                  <Send className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#333333] transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#333333] transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
