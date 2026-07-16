import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Search,
  Lock,
  LogOut,
  Users,
  Activity,
  Calendar,
} from "lucide-react";

const API_BASE = "https://laravel-production-7e1c.up.railway.app/api";

const Insights = () => {
  const [token, setToken] = useState(localStorage.getItem("audit_token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [visits, setVisits] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }
      localStorage.setItem("audit_token", data.token);
      setToken(data.token);
    } catch {
      setError("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [visitsRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/audit/visits?page=${page}&search=${search}&per_page=50`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE}/audit/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (visitsRes.status === 401 || statsRes.status === 401) {
        localStorage.removeItem("audit_token");
        setToken("");
        return;
      }

      const visitsData = await visitsRes.json();
      const statsData = await statsRes.json();
      setVisits(visitsData.data || []);
      setStats(statsData);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  }, [token, page, search]);

  useEffect(() => {
    if (token) fetchData();
  }, [token, fetchData]);

  const handleLogout = () => {
    localStorage.removeItem("audit_token");
    setToken("");
    setVisits([]);
    setStats(null);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDevice = (ua) => {
    if (!ua) return "Unknown";
    if (ua.includes("iPhone") || ua.includes("Android")) return "Mobile";
    if (ua.includes("iPad")) return "Tablet";
    return "Desktop";
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-[#12121a] border border-[#1e1e2a] rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-center w-16 h-16 bg-[#1e1e2a] rounded-2xl mx-auto mb-6">
              <Lock className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-2xl font-black text-white text-center mb-2">Insights</h2>
            <p className="text-gray-500 text-sm text-center mb-8 font-semibold">Authenticate to continue</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1a1a26] border border-[#2a2a3a] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors font-semibold text-sm"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1a1a26] border border-[#2a2a3a] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors font-semibold text-sm"
                  required
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm font-semibold text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Authenticating..." : "Access Dashboard"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Insights</h1>
            <p className="text-gray-500 text-sm font-semibold mt-1">Visitor Analytics</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-[#1e1e2a] hover:bg-[#2a2a3a] text-gray-400 rounded-xl transition-all duration-300 text-sm font-bold"
          >
            <LogOut className="w-4 h-4" />
            Exit
          </button>
        </div>

        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Visits", value: stats.total_visits, icon: <Eye className="w-4 h-4" />, color: "text-blue-500" },
              { label: "Unique Visitors", value: stats.unique_ips, icon: <Users className="w-4 h-4" />, color: "text-emerald-500" },
              { label: "Today", value: stats.today_visits, icon: <Activity className="w-4 h-4" />, color: "text-amber-500" },
              { label: "Unique Today", value: stats.unique_today_ips, icon: <Calendar className="w-4 h-4" />, color: "text-purple-500" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#12121a] border border-[#1e1e2a] rounded-2xl p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`${stat.color}`}>{stat.icon}</div>
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{stat.label}</span>
                </div>
                <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
              </motion.div>
            ))}
          </div>
        )}

        {stats && stats.top_pages && stats.top_pages.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-4 mb-8">
            <div className="bg-[#12121a] border border-[#1e1e2a] rounded-2xl p-5">
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Top Pages</h3>
              <div className="space-y-2">
                {stats.top_pages.map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-[#1e1e2a] last:border-0">
                    <span className="text-gray-300 text-sm font-semibold truncate max-w-[70%]">{p.page_url}</span>
                    <span className="text-blue-400 text-sm font-bold">{p.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#12121a] border border-[#1e1e2a] rounded-2xl p-5">
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Top Countries</h3>
              <div className="space-y-2">
                {stats.top_countries.map((c, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-[#1e1e2a] last:border-0">
                    <span className="text-gray-300 text-sm font-semibold">{c.country || "Unknown"}</span>
                    <span className="text-emerald-400 text-sm font-bold">{c.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#12121a] border border-[#1e1e2a] rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-[#1e1e2a]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search by IP, page, country..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 bg-[#1a1a26] border border-[#2a2a3a] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm font-semibold"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e1e2a]">
                  <th className="text-left px-5 py-3 text-gray-500 text-xs font-bold uppercase tracking-wider">IP</th>
                  <th className="text-left px-5 py-3 text-gray-500 text-xs font-bold uppercase tracking-wider">Location</th>
                  <th className="text-left px-5 py-3 text-gray-500 text-xs font-bold uppercase tracking-wider">Page</th>
                  <th className="text-left px-5 py-3 text-gray-500 text-xs font-bold uppercase tracking-wider">Device</th>
                  <th className="text-left px-5 py-3 text-gray-500 text-xs font-bold uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody>
                {visits.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-gray-500 font-semibold">
                      {loading ? "Loading..." : "No visits recorded yet"}
                    </td>
                  </tr>
                )}
                {visits.map((v) => (
                  <tr key={v.id} className="border-b border-[#1e1e2a] hover:bg-[#1a1a26] transition-colors">
                    <td className="px-5 py-3 text-gray-300 font-mono text-xs font-semibold">{v.ip_address}</td>
                    <td className="px-5 py-3">
                      <div className="text-gray-300 text-xs font-semibold">{v.city || "—"}</div>
                      <div className="text-gray-500 text-[10px] font-semibold">{v.country || "—"}{v.isp ? ` · ${v.isp}` : ""}</div>
                    </td>
                    <td className="px-5 py-3 text-gray-300 text-xs font-semibold max-w-[200px] truncate">{v.page_url}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        getDevice(v.user_agent) === "Mobile"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-blue-500/10 text-blue-400"
                      }`}>
                        {getDevice(v.user_agent)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs font-semibold whitespace-nowrap">{formatDate(v.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
