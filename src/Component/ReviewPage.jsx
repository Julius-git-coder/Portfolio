import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, Send, Sparkles, ArrowRight, Quote, X, GripVertical, RefreshCw, Lock } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const REVIEWS_COLLECTION = "reviews";

const StarRating = ({ rating, setRating, size = "w-8 h-8" }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="cursor-pointer transition-transform hover:scale-110"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          <Star
            className={`${size} ${
              star <= (hover || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const formatDate = (date) => {
  if (date instanceof Date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  if (typeof date === "string") {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return "Recently";
};

const ReviewPage = () => {
  const [searchParams] = useSearchParams();
  const highlightedId = searchParams.get("id");

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    rating: 0,
    text: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const [formPosition, setFormPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const formRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e) => {
    // Only start drag on the handle, not on buttons
    if ((e.target.tagName === "BUTTON" || e.target.closest("button"))) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setFormPosition((prev) => ({
        x: Math.max(-200, Math.min(200, prev.x + dx)),
        y: Math.max(-300, Math.min(300, prev.y + dy)),
      }));
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const resetPosition = () => {
    setFormPosition({ x: 0, y: 0 });
  };

  // Fetch all reviews from Firestore
  useEffect(() => {
    let unsubscribe;
    try {
      const reviewsRef = collection(db, REVIEWS_COLLECTION);
      const q = query(reviewsRef, orderBy("date", "desc"));

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const fetchedReviews = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setReviews(fetchedReviews);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error("Firebase error:", err);
          setError("Unable to load reviews. Please try again later.");
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
  }, []);

  const highlightedReview = highlightedId
    ? reviews.find((r) => r.id === highlightedId)
    : null;
  const otherReviews = highlightedId
    ? reviews.filter((r) => r.id !== highlightedId)
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim() || formData.rating === 0) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const newReview = {
        name: formData.name.trim(),
        role: formData.role.trim() || "Client",
        rating: formData.rating,
        text: formData.text.trim(),
        date: serverTimestamp(),
      };

      await addDoc(collection(db, REVIEWS_COLLECTION), newReview);

      setFormData({ name: "", role: "", rating: 0, text: "" });
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit review:", err);
      setError("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-gray-100 rounded-3xl p-10 shadow-xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Star className="w-10 h-10 text-green-600 fill-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Thank You!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Your review has been submitted successfully. It will appear on Julius's portfolio shortly.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300"
            >
              Visit Portfolio
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:border-gray-400 transition-all duration-300"
            >
              Submit Another Review
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Build the full reviews list for display
  const allReviews = highlightedReview
    ? [highlightedReview, ...otherReviews]
    : reviews;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline text-sm"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to Portfolio
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-600 transition-colors"
              title="Admin Panel"
            >
              <Lock className="w-3.5 h-3.5" />
              Admin
            </Link>
          </div>
          <div className="inline-block">
            <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
              {highlightedReview
                ? "Review Details"
                : "Reviews for "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Julius</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-lg mx-auto">
              {highlightedReview
                ? "Full review details below."
                : "See what people say about working with Julius."}
            </p>
          </div>
        </motion.div>

        {/* Error Banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 border border-red-200 rounded-xl px-6 py-4 text-center"
          >
            <p className="text-red-700 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Two-column layout: Reviews on left, Form on right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: All Reviews */}
          <div className="lg:col-span-2">
            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg h-40 animate-pulse"
                  >
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                        <div>
                          <div className="h-4 bg-gray-200 rounded w-36 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-24"></div>
                        </div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            )}

            {/* All Reviews */}
            {!loading && allReviews.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  All Reviews ({allReviews.length})
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {allReviews.map((review, index) => {
                    const isHighlighted = review.id === highlightedId;
                    return (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`relative bg-white rounded-2xl p-6 sm:p-7 shadow-lg hover:shadow-xl transition-all duration-300 w-full ${
                          isHighlighted
                            ? "border-2 border-blue-200 ring-4 ring-blue-100"
                            : "border border-gray-100"
                        }`}
                      >
                        {isHighlighted && (
                          <div className="absolute -top-3 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                            ★ Highlighted
                          </div>
                        )}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-sm ${
                                isHighlighted
                                  ? "w-14 h-14 text-xl"
                                  : "w-12 h-12 text-base"
                              }`}
                            >
                              {review.name.charAt(0)}
                            </div>
                            <div>
                              <h4
                                className={`font-bold text-gray-900 ${
                                  isHighlighted ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                                }`}
                              >
                                {review.name}
                              </h4>
                              <p
                                className={`${
                                  isHighlighted ? "text-sm" : "text-xs sm:text-sm"
                                } text-gray-500`}
                              >
                                {review.role}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 self-start sm:self-auto">
                            <StarRating
                              rating={review.rating}
                              size={isHighlighted ? "w-6 h-6" : "w-5 h-5"}
                            />
                            <Quote
                              className={`${
                                isHighlighted ? "w-8 h-8" : "w-6 h-6"
                              } text-blue-200 rotate-180 flex-shrink-0 hidden sm:block`}
                            />
                          </div>
                        </div>
                        <p
                          className={`leading-relaxed italic ${
                            isHighlighted
                              ? "text-gray-700 text-base sm:text-lg"
                              : "text-gray-600 text-sm sm:text-base"
                          }`}
                        >
                          "{review.text}"
                        </p>
                        <p
                          className={`text-gray-400 mt-4 pt-3 border-t border-gray-100 ${
                            isHighlighted ? "text-sm" : "text-xs"
                          }`}
                        >
                          {formatDate(review.date)}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty state */}
            {!loading && allReviews.length === 0 && (
              <div className="text-center py-12">
                <Quote className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No reviews yet.</p>
                <p className="text-gray-400 text-sm">Be the first to leave a review!</p>
              </div>
            )}
          </div>

          {/* Right: Sticky Review Form */}
          {showForm && (
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <motion.div
                  ref={formRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, x: formPosition.x, y: formPosition.y }}
                  exit={{ opacity: 0, x: 50 }}
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur opacity-50"></div>
                    <div className={`relative bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xl transition-shadow duration-200 ${isDragging ? 'shadow-2xl border-blue-200' : ''}`}>
                      {/* Drag Handle + Controls */}
                      <div
                        onMouseDown={handleMouseDown}
                        className={`flex items-center justify-between mb-4 pb-4 border-b border-gray-100 cursor-grab active:cursor-grabbing rounded-xl p-2 -m-2 transition-colors duration-200 ${isDragging ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                      >
                        <div className="flex items-center gap-2">
                          <GripVertical className={`w-5 h-5 transition-colors duration-200 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
                          <span className={`text-xs transition-colors duration-200 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`}>
                            {isDragging ? 'Dragging...' : 'Drag to move'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {(formPosition.x !== 0 || formPosition.y !== 0) && (
                            <button
                              type="button"
                              onClick={resetPosition}
                              className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                              title="Reset position"
                            >
                              <RefreshCw className="w-4 h-4 text-gray-400 hover:text-blue-500" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                          >
                            <X className="w-5 h-5 text-gray-500" />
                          </button>
                        </div>
                      </div>
                      <div className="text-center mb-6">
                        <Sparkles className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                        <h2 className="text-xl font-bold text-gray-900">
                          Leave a Review
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                          Share your experience working with Julius
                        </p>
                      </div>
                    <motion.form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Role / Company
                          </label>
                          <input
                            type="text"
                            value={formData.role}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                role: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Product Manager at TechCorp"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Rating *
                          </label>
                          <StarRating
                            rating={formData.rating}
                            setRating={(r) =>
                              setFormData({ ...formData, rating: r })
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Review *
                          </label>
                          <textarea
                            required
                            value={formData.text}
                            onChange={(e) =>
                              setFormData({ ...formData, text: e.target.value })
                            }
                            rows={8}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-y min-h-[200px]"
                            placeholder="Share your experience..."
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          disabled={
                            !formData.name.trim() ||
                            !formData.text.trim() ||
                            formData.rating === 0 ||
                            submitting
                          }
                          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 inline-flex items-center justify-center gap-2 text-lg"
                        >
                          {submitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Submit Review
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  </div>
                </div>

                {/* Footer link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mt-6"
                >
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline text-sm"
                  >
                    View Julius's Portfolio
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
          )}

          {/* Floating button to reopen form */}
          {!showForm && (
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setShowForm(true)}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-3 text-lg"
                >
                  <Sparkles className="w-6 h-6" />
                  Leave a Review
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
