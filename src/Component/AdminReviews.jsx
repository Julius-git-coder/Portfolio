import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Lock,
  Unlock,
  Trash2,
  Star,
  Search,
  Filter,
  ArrowLeft,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  LogOut,
  RefreshCw,
  Sparkles,
  Quote,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

const REVIEWS_COLLECTION = "reviews";
const DEFAULT_PIN = import.meta.env.VITE_ADMIN_PIN || "2026";
const AUTH_STORAGE_KEY = "portfolio_admin_auth";

const formatDate = (date) => {
  if (!date) return "Recently";
  if (date?.toDate && typeof date.toDate === "function") {
    return date.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  if (date instanceof Date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  if (typeof date === "string") {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return "Recently";
};

const AdminReviews = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Auto-clear toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Fetch live reviews from Firestore
  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);

    let unsubscribe;
    try {
      const reviewsRef = collection(db, REVIEWS_COLLECTION);
      const q = query(reviewsRef, orderBy("date", "desc"));

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }));
          setReviews(list);
          setLoading(false);
        },
        (err) => {
          console.error("Firestore listener error:", err);
          setLoading(false);
        }
      );
    } catch (err) {
      console.error("Setup error:", err);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
      setPinError("");
      setPinInput("");
      setToastMessage("Welcome back, Julius!");
    } else {
      setPinError("Invalid PIN. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setToastMessage("Signed out of Admin Mode.");
  };

  const handleDelete = async () => {
    if (!reviewToDelete) return;
    setIsDeleting(true);

    try {
      await deleteDoc(doc(db, REVIEWS_COLLECTION, reviewToDelete.id));
      setToastMessage(`Review by "${reviewToDelete.name}" was permanently deleted.`);
      setReviewToDelete(null);
    } catch (err) {
      console.error("Failed to delete review:", err);
      alert("Failed to delete review. Please check your Firebase permissions.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter & Sort
  const filteredReviews = reviews
    .filter((r) => {
      const matchSearch =
        r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.text?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRating =
        ratingFilter === "all"
          ? true
          : ratingFilter === "5"
          ? r.rating === 5
          : ratingFilter === "4"
          ? r.rating === 4
          : ratingFilter === "low"
          ? r.rating <= 3
          : true;
      return matchSearch && matchRating;
    })
    .sort((a, b) => {
      if (sortBy === "highest") return b.rating - a.rating;
      if (sortBy === "lowest") return a.rating - b.rating;
      return 0; // default order is newest by Firestore query
    });

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : "0.0";
  const fiveStarsCount = reviews.filter((r) => r.rating === 5).length;
  const lowStarsCount = reviews.filter((r) => r.rating <= 3).length;

  // Render Login Card if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-gray-900/80 border border-gray-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              Reviews Management
            </h1>
            <p className="text-sm text-gray-400">
              Enter your Administrator PIN to manage and delete reviews.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Admin Security PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError("");
                  }}
                  placeholder="Enter PIN..."
                  autoFocus
                  className="w-full px-4 py-3.5 bg-gray-950 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono tracking-widest text-center text-lg"
                />
                <Lock className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
              {pinError && (
                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {pinError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              Unlock Dashboard
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-800/80 text-center">
            <Link
              to="/"
              className="text-xs text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-gray-900 block leading-tight">
                Reviews Manager
              </span>
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Admin Authenticated
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4" />
              View Site
            </Link>
            <Link
              to="/review"
              className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors hidden sm:inline-flex items-center gap-1.5"
            >
              Public Reviews
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs sm:text-sm font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Manage Client Reviews
          </h1>
          <p className="text-gray-500 text-base mt-1">
            Review, filter, inspect, and delete spam or negative reviews from your portfolio.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Total Reviews
            </p>
            <p className="text-3xl font-extrabold text-gray-900">{reviews.length}</p>
            <p className="text-xs text-gray-500 mt-1">Real-time in Firestore</p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Average Rating
            </p>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-extrabold text-gray-900">{averageRating}</span>
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">Overall client satisfaction</p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              5-Star Reviews
            </p>
            <p className="text-3xl font-extrabold text-emerald-600">{fiveStarsCount}</p>
            <p className="text-xs text-gray-500 mt-1">Top tier ratings</p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              ≤ 3 Stars (Low)
            </p>
            <p className="text-3xl font-extrabold text-amber-600">{lowStarsCount}</p>
            <p className="text-xs text-gray-500 mt-1">Review candidates to inspect</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by author, role, or review text..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Rating:
              </span>
              {[
                { label: "All", value: "all" },
                { label: "5 ★", value: "5" },
                { label: "4 ★", value: "4" },
                { label: "≤ 3 ★", value: "low" },
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setRatingFilter(f.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    ratingFilter === f.value
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}

              <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-100 border border-transparent rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs animate-pulse"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-28"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center">
            <Quote className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">No Reviews Found</h3>
            <p className="text-sm text-gray-500">
              {searchTerm || ratingFilter !== "all"
                ? "No reviews match your current search or filter criteria."
                : "No reviews have been submitted to Firestore yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Left: User Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm">
                      {review.name?.charAt(0) || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 text-lg">{review.name}</h3>
                        <span className="text-xs font-medium text-gray-500">•</span>
                        <span className="text-xs font-medium text-gray-500">{review.role}</span>
                        <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {formatDate(review.date)}
                        </span>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${
                              s <= (review.rating || 0)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                        <span className="text-xs font-bold text-gray-600 ml-1.5">
                          {review.rating}/5
                        </span>
                      </div>

                      {/* Review Text */}
                      <p className="text-gray-700 leading-relaxed italic text-sm sm:text-base bg-gray-50/70 border border-gray-100 rounded-xl p-4">
                        "{review.text}"
                      </p>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <button
                      onClick={() => setReviewToDelete(review)}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200/80 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-150 cursor-pointer hover:shadow-xs"
                      title="Permanently delete this review"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Review
                    </button>

                    <Link
                      to={`/review?id=${review.id}`}
                      target="_blank"
                      className="text-xs text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 hover:underline px-2 py-1"
                    >
                      View on site
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {reviewToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 relative"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                Delete this review?
              </h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                This action is permanent and cannot be undone. It will be immediately removed from Firestore and your live portfolio.
              </p>

              {/* Excerpt */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-6">
                <p className="text-xs font-bold text-gray-900 mb-1">
                  {reviewToDelete.name} ({reviewToDelete.role})
                </p>
                <p className="text-xs text-gray-600 italic line-clamp-3">
                  "{reviewToDelete.text}"
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setReviewToDelete(null)}
                  className="flex-1 py-3 px-4 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleDelete}
                  className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 transition-all duration-150 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-800"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminReviews;
