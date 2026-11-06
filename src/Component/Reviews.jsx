import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, Sparkles, Quote, Share2, X, Check, Link as LinkIcon, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

const REVIEWS_COLLECTION = "reviews";

const defaultReviews = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Startup Founder",
    rating: 5,
    text: "Julius delivered an exceptional web application that exceeded our expectations. His attention to detail and problem-solving skills are outstanding. Highly recommended!",
    date: "2025-10-15",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Product Manager",
    rating: 5,
    text: "Working with Julius was a fantastic experience. He understood our vision perfectly and translated it into a beautiful, functional product. The communication was excellent throughout.",
    date: "2025-09-20",
  },
  {
    id: 3,
    name: "Michael Roberts",
    role: "CTO, TechCorp",
    rating: 5,
    text: "Julius is a talented developer who brings both technical expertise and creative solutions to the table. Our project was completed on time and with exceptional quality.",
    date: "2025-08-05",
  },
];

const StarRating = ({ rating, setRating, interactive = false }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          className={`${interactive ? "cursor-pointer" : "cursor-default"} transition-transform ${interactive ? "hover:scale-110" : ""}`}
          onClick={() => interactive && setRating(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
        >
          <Star
            className={`w-6 h-6 ${
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

const CopyLinkModal = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const reviewUrl = `${window.location.origin}/review`;

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: "💬",
      url: `https://wa.me/?text=${encodeURIComponent("Share your experience working with Julius! Leave a review here: " + reviewUrl)}`,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "Twitter / X",
      icon: "🐦",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent("Share your experience working with Julius! Leave a review: ")}&url=${encodeURIComponent(reviewUrl)}`,
      color: "bg-black hover:bg-gray-800",
    },
    {
      name: "LinkedIn",
      icon: "💼",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(reviewUrl)}`,
      color: "bg-blue-700 hover:bg-blue-800",
    },
    {
      name: "Facebook",
      icon: "📘",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(reviewUrl)}`,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Email",
      icon: "📧",
      url: `mailto:?subject=${encodeURIComponent("Leave a review for Julius")}&body=${encodeURIComponent("Share your experience working with Julius! Leave a review here:\n\n" + reviewUrl)}`,
      color: "bg-gray-600 hover:bg-gray-700",
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(reviewUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareNatively = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Review Julius",
          text: "Share your experience working with Julius! Leave a review here.",
          url: reviewUrl,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">Share Review Link</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Preview */}
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <p className="text-sm text-gray-600 mb-2">Share this link so people can leave you a review:</p>
            <p className="text-xs font-mono bg-white px-3 py-2 rounded-lg text-blue-600 break-all">{reviewUrl}</p>
          </div>

          {/* Share Options */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {shareLinks.map((share) => (
                <a
                  key={share.name}
                  href={share.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${share.color} text-white rounded-xl p-3 flex flex-col items-center gap-1.5 transition-all duration-200 hover:scale-105`}
                >
                  <span className="text-xl">{share.icon}</span>
                  <span className="text-xs font-medium">{share.name}</span>
                </a>
              ))}
            </div>

            {/* Copy & Native Share */}
            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>Copy Link</>
                )}
              </button>
              {navigator.share && (
                <button
                  onClick={shareNatively}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ReviewCard = ({ review }) => {
  const [showShare, setShowShare] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const TRUNCATE_LENGTH = 260;
  const isLong = review.text.length > TRUNCATE_LENGTH;
  const displayText = isLong && !expanded ? review.text.slice(0, TRUNCATE_LENGTH) + "..." : review.text;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="group relative w-full"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
        <div className="relative bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300 w-full flex flex-col justify-between">
          {/* Header Row - User Info on Left, Stars & Quote on Right */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl sm:text-2xl flex-shrink-0 shadow-md">
                {review.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-gray-900 text-lg sm:text-2xl truncate">{review.name}</h4>
                <p className="text-sm sm:text-base text-gray-500 truncate">{review.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 self-start sm:self-auto">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-2xl flex items-center shadow-xs">
                <StarRating rating={review.rating} />
              </div>
              <Quote className="w-10 h-10 text-blue-200 rotate-180 flex-shrink-0 hidden sm:block" />
            </div>
          </div>

          {/* Review Text - Spans Full Width Across Row */}
          <div className="mb-6 flex-1">
            <p className="text-gray-700 leading-relaxed italic text-base sm:text-lg lg:text-xl">
              "{displayText}"
            </p>
            {isLong && !expanded && (
              <button
                onClick={() => setExpanded(true)}
                className="text-blue-600 text-sm sm:text-base font-semibold mt-3 hover:text-blue-700 transition-colors self-start px-3 py-1.5 rounded-lg hover:bg-blue-50 inline-block cursor-pointer"
              >
                Read more
              </button>
            )}
            {isLong && expanded && (
              <button
                onClick={() => setExpanded(false)}
                className="text-blue-600 text-sm sm:text-base font-semibold mt-3 hover:text-blue-700 transition-colors self-start px-3 py-1.5 rounded-lg hover:bg-blue-50 inline-block cursor-pointer"
              >
                Show less
              </button>
            )}
          </div>

          {/* Bottom Row - Extended Actions Full Width */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100 gap-4">
            <Link
              to="/review"
              onClick={(e) => e.stopPropagation()}
              className="text-blue-600 text-sm sm:text-base font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-all duration-200"
            >
              Leave a Review
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            <button
              onClick={() => setShowShare(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-all duration-200 cursor-pointer"
              title="Share review form link"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm font-semibold">Share Link</span>
            </button>
          </div>
        </div>
      </motion.div>
      {showShare && <CopyLinkModal onClose={() => setShowShare(false)} />}
    </>
  );
};

const Reviews = () => {
  const [reviews, setReviews] = useState(defaultReviews);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showShareLink, setShowShareLink] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    rating: 0,
    text: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollToReview = (index) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cards = container.children;
      if (cards && cards[index]) {
        const targetLeft = cards[index].offsetLeft - container.offsetLeft;
        container.scrollTo({
          left: targetLeft,
          behavior: "smooth",
        });
        setCurrentIndex(index);
      }
    }
  };

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? reviews.length - 1 : currentIndex - 1;
    scrollToReview(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === reviews.length - 1 ? 0 : currentIndex + 1;
    scrollToReview(newIndex);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cards = container.children;
      if (!cards || cards.length === 0) return;
      const scrollLeft = container.scrollLeft;
      let closestIndex = 0;
      let minDiff = Infinity;
      for (let i = 0; i < cards.length; i++) {
        const cardOffset = cards[i].offsetLeft - container.offsetLeft;
        const diff = Math.abs(scrollLeft - cardOffset);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = i;
        }
      }
      if (closestIndex !== currentIndex) {
        setCurrentIndex(closestIndex);
      }
    }
  };

  // Auto-scroll every 7 seconds, pauses on user hover or touch
  useEffect(() => {
    if (isPaused || reviews.length <= 1) return;
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % reviews.length;
      scrollToReview(nextIndex);
    }, 7000);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, reviews.length]);

  // Listen for real-time reviews from Firebase
  useEffect(() => {
    let unsubscribe;
    try {
      const reviewsRef = collection(db, REVIEWS_COLLECTION);
      const q = query(reviewsRef, orderBy("date", "desc"), limit(50));
      
      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const fetchedReviews = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          
          // If Firebase has reviews, use them; otherwise fall back to defaults
          if (fetchedReviews.length > 0) {
            setReviews(fetchedReviews);
          }
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error("Firebase error:", err);
          // If Firebase is not configured yet, fall back to default reviews
          if (err.code === "permission-denied" || err.code === "unavailable") {
            setReviews(defaultReviews);
            setLoading(false);
            setError("Reviews temporarily unavailable. Showing sample reviews.");
          } else {
            setError("Unable to load reviews. Please try again later.");
            setLoading(false);
          }
        }
      );
    } catch (err) {
      console.error("Setup error:", err);
      setReviews(defaultReviews);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim() || formData.rating === 0) {
      return;
    }

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
      setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert("Failed to submit review. Please try again.");
    }
  };

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2 block text-center">
              Testimonials
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 text-center">
              What People <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Say</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto leading-relaxed md:font-bold">
            Don't just take my word for it — hear from the people I've had the pleasure of working with.
          </p>

          {/* Rating Summary */}
          <div className="mt-8 inline-flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-8 py-4 shadow-lg">
            <div className="flex items-center gap-1">
              <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              <span className="text-3xl font-bold text-gray-900">{averageRating}</span>
            </div>
            <div className="h-10 w-px bg-gray-200"></div>
            <div>
              <p className="font-bold text-gray-900">{reviews.length} Reviews</p>
              <p className="text-sm text-gray-500">From satisfied clients</p>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-8 bg-blue-50 border border-blue-200 rounded-xl px-6 py-4 text-center"
          >
            <p className="text-blue-700 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg animate-pulse">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gray-200"></div>
                  <div>
                    <div className="h-5 bg-gray-200 rounded w-36 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-8 bg-gray-200 rounded-xl w-32 hidden sm:block"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-28 pt-6 border-t border-gray-100"></div>
            </div>
          </div>
        ) : (
          /* Reviews Scrollable Carousel */
          <div className="relative max-w-5xl mx-auto mb-16">
            {/* Top Navigation Controls */}
            <div className="flex items-center justify-between mb-6 px-1">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Review <span className="text-gray-900 font-bold">{currentIndex + 1}</span> of{" "}
                  <span className="text-gray-900 font-bold">{reviews.length}</span>
                </span>
                <span className="hidden sm:inline-block text-xs text-gray-400">
                  • Swipe or use arrows to scroll
                </span>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous review"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-600 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next review"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-600 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Track */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-6 py-2 -mx-2 px-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="w-full min-w-full snap-start snap-always flex-shrink-0 px-1"
                >
                  <ReviewCard review={review} index={index} />
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            {reviews.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToReview(idx)}
                    aria-label={`Go to review ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      currentIndex === idx
                        ? "w-8 h-2.5 bg-gradient-to-r from-blue-600 to-purple-600 shadow-sm"
                        : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Submit Review Section */}
        <div className="max-w-3xl mx-auto">
          {!showForm ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative inline-block group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-white border border-blue-100 rounded-3xl p-8 sm:p-10 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <Sparkles className="w-12 h-12 text-blue-600" />
                    <button
                      onClick={() => setShowShareLink(true)}
                      className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all duration-200"
                      title="Share review link"
                    >
                      <Share2 className="w-5 h-5" />
                      <span className="text-xs">Share</span>
                    </button>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Worked with Julius?
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                    Share your experience and help others discover what it's like to work with me.
                  </p>
                  <Link
                    to="/review"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 mx-auto"
                  >
                    <Send className="w-5 h-5" />
                    Leave a Review
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="relative bg-white border border-blue-100 rounded-3xl p-8 sm:p-10 shadow-xl"
            >
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-white rounded-3xl flex flex-col items-center justify-center z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Star className="w-8 h-8 text-green-600 fill-green-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h4>
                  <p className="text-gray-600">Your review has been submitted successfully.</p>
                </motion.div>
              )}

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Share Your Experience</h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Product Manager at TechCorp"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rating *
                  </label>
                  <StarRating rating={formData.rating} setRating={(r) => setFormData({ ...formData, rating: r })} interactive />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Review *
                  </label>
                  <textarea
                    required
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-y min-h-[200px]"
                    placeholder="Share your experience working with Julius..."
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={!formData.name.trim() || !formData.text.trim() || formData.rating === 0}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:border-gray-400 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </div>

        {/* Share Link Modal */}
        {showShareLink && <CopyLinkModal onClose={() => setShowShareLink(false)} />}
      </div>
    </section>
  );
};

export default Reviews;
