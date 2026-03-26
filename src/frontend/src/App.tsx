import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Placeholder components - to be implemented
const Dashboard = () => <div>Dashboard - Device Overview</div>;
const DeviceDetails = () => <div>Device Details</div>;
const Diagnostics = () => <div>Run Diagnostics</div>;
const LogAnalyzer = () => <div>Log Analyzer</div>;
const Remediation = () => <div>Remediation Tools</div>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="app">
          <header>
            <h1>Windows Autopilot Troubleshooter</h1>
            <nav>
              <a href="/">Dashboard</a>
              <a href="/diagnostics">Diagnostics</a>
              <a href="/logs">Log Analyzer</a>
              <a href="/remediation">Remediation</a>
            </nav>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/device/:id" element={<DeviceDetails />} />
              <Route path="/diagnostics" element={<Diagnostics />} />
              <Route path="/logs" element={<LogAnalyzer />} />
              <Route path="/remediation" element={<Remediation />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
