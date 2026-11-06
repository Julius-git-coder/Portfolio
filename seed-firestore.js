import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCrvImWDqCGp1gTn8g88FQHqNQXHXAh5JE",
  authDomain: "aquatrack-34a8b.firebaseapp.com",
  projectId: "aquatrack-34a8b",
  storageBucket: "aquatrack-34a8b.firebasestorage.app",
  messagingSenderId: "839061131699",
  appId: "1:839061131699:web:2bed8143ed3d164ba93bc6",
  measurementId: "G-P88RYL0RH9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Default reviews to seed
const defaultReviews = [
  {
    name: "Alex Thompson",
    role: "Startup Founder",
    rating: 5,
    text: "Julius delivered an exceptional web application that exceeded our expectations. His attention to detail and problem-solving skills are outstanding. Highly recommended!",
    date: new Date("2025-10-15"),
  },
  {
    name: "Sarah Chen",
    role: "Product Manager",
    rating: 5,
    text: "Working with Julius was a fantastic experience. He understood our vision perfectly and translated it into a beautiful, functional product. The communication was excellent throughout.",
    date: new Date("2025-09-20"),
  },
  {
    name: "Michael Roberts",
    role: "CTO, TechCorp",
    rating: 5,
    text: "Julius is a talented developer who brings both technical expertise and creative solutions to the table. Our project was completed on time and with exceptional quality.",
    date: new Date("2025-08-05"),
  },
];

async function seedReviews() {
  try {
    // Check if reviews already exist
    const reviewsRef = collection(db, "reviews");
    const snapshot = await getDocs(reviewsRef);
    
    if (snapshot.empty) {
      console.log("🌱 Seeding reviews collection...");
      
      for (const review of defaultReviews) {
        await addDoc(reviewsRef, {
          name: review.name,
          role: review.role,
          rating: review.rating,
          text: review.text,
          date: review.date,
        });
        console.log(`✅ Added review from ${review.name}`);
      }
      
      console.log("\n🎉 Done! Reviews have been seeded to Firestore.");
    } else {
      console.log(`📊 Reviews collection already has ${snapshot.size} document(s). Skipping seed.`);
    }
  } catch (error) {
    console.error("❌ Error seeding reviews:", error.message);
    console.log("\n💡 Make sure you've created a Firestore database in the Firebase Console:");
    console.log("   1. Go to https://console.firebase.google.com/project/aquatrack-34a8b/firestore");
    console.log("   2. Click 'Create database'");
    console.log("   3. Select 'Start in test mode'");
    console.log("   4. Choose a location and click 'Enable'");
  }
}

// Run the seed function
seedReviews();
