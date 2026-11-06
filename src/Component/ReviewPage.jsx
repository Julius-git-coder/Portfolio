import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Send,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  User,
  Briefcase,
  MessageSquare,
  Lock,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const REVIEWS_COLLECTION = "reviews";

const RATING_DESCRIPTIONS = {
  1: "Poor experience",
  2: "Fair, room for improvement",
  3: "Good, satisfied with the work",
  4: "Great, very impressed!",
  5: "Exceptional! Highly recommended ★★★★★",
};

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);
  const activeRating = hover || rating;

  return (
    <div className="flex flex-col items-center sm:items-start gap-2">
      <div className="flex items-center gap-1.5 sm:gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="p-1 transition-transform hover:scale-125 active:scale-95 cursor-pointer focus:outline-none"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            <Star
              className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors ${
                star <= activeRating
                  ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
                  : "text-gray-300 hover:text-yellow-200"
              }`}
            />
          </button>
        ))}
      </div>
      <span className="text-xs sm:text-sm font-semibold text-blue-600 min-h-[20px] transition-all">
        {activeRating ? RATING_DESCRIPTIONS[activeRating] : "Tap a star to rate"}
      </span>
    </div>
  );
};

const ReviewPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    rating: 5,
    text: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!formData.rating || formData.rating < 1) {
      setError("Please select a star rating.");
      return;
    }
    if (!formData.text.trim()) {
      setError("Please write your review feedback.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const newReview = {
        name: formData.name.trim(),
        role: formData.role.trim() || "Client",
        rating: Number(formData.rating),
        text: formData.text.trim(),
        date: serverTimestamp(),
      };

      await addDoc(collection(db, REVIEWS_COLLECTION), newReview);

      setFormData({ name: "", role: "", rating: 5, text: "" });
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit review:", err);
      setError("Failed to submit your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Success Confirmation Screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/40 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-lg w-full text-center relative overflow-hidden"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Thank You for Your Review!
          </h2>

          <p className="text-gray-600 mb-8 text-base sm:text-lg leading-relaxed">
            Your feedback has been received and added to Julius's portfolio. Your support is deeply appreciated!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Visit Julius's Portfolio
            </Link>

            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Submit Another Review
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/40 via-white to-purple-50/30 py-8 sm:py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>

          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            title="Admin Login"
          >
            <Lock className="w-3.5 h-3.5" />
            Admin
          </Link>
        </div>

        {/* Review Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          {/* Subtle Glow Backdrop */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-pink-600/15 rounded-3xl blur-xl opacity-60"></div>

          <div className="relative bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl">
            {/* Header */}
            <div className="text-center mb-8 pb-8 border-b border-gray-100">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                JD
              </div>
              <div className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-xs uppercase tracking-wider mb-2 bg-blue-50 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                Client Feedback
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Leave a Review for <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Julius</span>
              </h1>
              <p className="text-gray-600 text-sm sm:text-base mt-3 max-w-md mx-auto leading-relaxed">
                Worked with Julius? Share your honest experience, project outcome, and feedback below.
              </p>
            </div>

            {/* Error Banner */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* The Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Overall Rating <span className="text-red-500">*</span>
                </label>
                <StarRating
                  rating={formData.rating}
                  setRating={(r) => setFormData({ ...formData, rating: r })}
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50/70 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Role / Company */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Your Role & Organization{" "}
                  <span className="text-xs text-gray-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Briefcase className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Founder at TechCorp or Product Manager"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50/70 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Your Review & Experience <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="w-5 h-5 text-gray-400 absolute left-4 top-4" />
                  <textarea
                    required
                    rows={6}
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    placeholder="How was your experience working with Julius? What project did he deliver, and what stood out about his technical skills, communication, or speed?"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50/70 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-medium resize-y min-h-[150px]"
                  ></textarea>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-right">
                  {formData.text.length} characters
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Submitting Review...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Review
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Reviews are submitted directly to Julius Dagana's portfolio. Thank you for your feedback!
        </p>
      </div>
    </div>
  );
};

export default ReviewPage;
