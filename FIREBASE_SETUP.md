# Firebase Setup Guide for Reviews

This guide will help you set up Firebase Firestore to enable shared reviews across all visitors of your portfolio.

## Your Firebase Project

Your app is already configured with Firebase project credentials:
- **Project ID**: `aquatrack-34a8b`
- **Console URL**: https://console.firebase.google.com/project/aquatrack-34a8b/

## Step 1: Create Firestore Database (Required)

1. Go to [Firestore Database](https://console.firebase.google.com/project/aquatrack-34a8b/firestore)
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development — you can secure it later)
4. Choose a location closest to you (e.g., `us-east4` for North America, `europe-west1` for Europe)
5. Click **"Enable"**

⚠️ **This is the only manual step required!** Once Firestore is enabled, your app will automatically connect.

## Step 2: Seed Initial Reviews (Optional)

After creating the Firestore database, you can automatically populate it with default reviews:

```bash
cd Portfolio
node seed-firestore.js
```

This script will:
- Check if reviews already exist
- Add 3 default reviews if the collection is empty
- Skip seeding if reviews are already present

## Step 3: (Optional) Secure Your Database

Once you're ready for production, update your Firestore rules:

1. Go to **Firestore Database** → **Rules** tab
2. Update the rules to prevent spam:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reviews/{review} {
      // Allow anyone to read reviews
      allow read: if true;
      
      // Allow writes with basic validation
      allow create: if 
        // Limit name length
        request.resource.data.name.size() <= 100 &&
        // Limit review text length
        request.resource.data.text.size() <= 1000 &&
        // Rating must be 1-5
        request.resource.data.rating >= 1 &&
        request.resource.data.rating <= 5;
    }
  }
}
```

## What Happens Before You Set Up Firestore?

The app will still work! It will show the default sample reviews. Once you enable Firestore, reviews will be shared across all visitors automatically.

## Features

- ✅ **Real-time updates**: New reviews appear instantly for all visitors
- ✅ **Free tier**: Firebase free tier allows 50,000 reads/day and 20,000 writes/day
- ✅ **Automatic persistence**: Reviews are stored in the cloud
- ✅ **Graceful fallback**: Shows sample reviews if Firestore is not configured
