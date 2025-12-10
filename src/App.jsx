import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Header from './components/Header';
import Home from './pages/Home';
import Players from './pages/Players';
import Clubs from './pages/Clubs';
import Leagues from './pages/Leagues';
import Matches from './pages/Matches';
import Transfers from './pages/Transfers';
import Statistics from './pages/Statistics';
import Watchlist from './pages/Watchlist';
import Notifications from './pages/Notifications';
import AIPredictions from './pages/AIPredictions';
import Scouting from './pages/Scouting';
import Payments from './pages/Payments';
import Valuation from './pages/Valuation';
import StaffAgencies from './pages/StaffAgencies';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Players Routes */}
            <Route path="/igraci" element={<Players />} />
            <Route path="/igraci/stats" element={<Players />} />
            <Route path="/igraci/enrichment" element={<Players />} />
            <Route path="/igraci/development" element={<AIPredictions />} />
            
            {/* Clubs Routes */}
            <Route path="/klubovi" element={<Clubs />} />
            <Route path="/klubovi/dashboard" element={<Clubs />} />
            
            {/* Leagues Routes */}
            <Route path="/lige" element={<Leagues />} />
            <Route path="/lige/seasons" element={<Leagues />} />
            
            {/* Matches Routes */}
            <Route path="/utakmice" element={<Matches />} />
            <Route path="/utakmice/events" element={<Matches />} />
            <Route path="/utakmice/stats" element={<Matches />} />
            
            {/* Transfers */}
            <Route path="/transferi" element={<Transfers />} />
            
            {/* Statistics Routes */}
            <Route path="/statistike" element={<Statistics />} />
            <Route path="/statistike/players" element={<Statistics />} />
            <Route path="/statistike/matches" element={<Statistics />} />
            
            {/* Watchlist */}
            <Route path="/watchlist" element={<Watchlist />} />
            
            {/* Notifications */}
            <Route path="/notifikacije" element={<Notifications />} />
            
            {/* AI Predictions */}
            <Route path="/ai-predikcije" element={<AIPredictions />} />
            
            {/* Scouting Routes */}
            <Route path="/scouting" element={<Scouting />} />
            <Route path="/scouting/shortlists" element={<Scouting />} />
            <Route path="/scouting/packages" element={<Scouting />} />
            
            {/* Valuation */}
            <Route path="/valuation" element={<Valuation />} />
            
            {/* Subscriptions */}
            <Route path="/pretplate" element={<Payments />} />
            
            {/* Staff & Agencies */}
            <Route path="/staff-agencies" element={<StaffAgencies />} />
              </Routes>
          </main>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
