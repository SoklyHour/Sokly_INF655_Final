# Event Ticket Booking Website

A modern, responsive event ticket booking web app built with **ReactJS** and **Firebase**. Users can browse events, add tickets to a cart, sign up/log in, complete bookings, and view their booking history.

---

## Features

- **Event Listing:** Browse all events dynamically from a static data file.
- **Event Details:** View detailed info and add tickets to cart.
- **Cart:** Manage ticket quantities, remove items, and see total price.
- **Checkout:** Complete booking and save to Firebase.
- **Authentication:** Sign up, log in, and log out with Firebase Auth.
- **Profile:** View user info and booking history from Firebase.
- **Sort & Search:** Sort events by price/date and search by title.
- **Responsive Design:** Works on mobile and desktop.

---

## Getting Started

### . Project Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/SoklyHour/Sokly_INF655_Final.git
npm install
```
---

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/), create a project.
2. Enable **Authentication** (Email/Password).
3. Create a **Cloud Firestore** database.

### Add your own Firebase config to `/src/firebase/config.js`:

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  // ...other config
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

---

## Firestore Security Rules

**Important:**  
Set these rules in the Firebase Console under **Firestore Database > Rules** to protect user data:

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /bookings/{bookingId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

---

## Running the App

```bash
npm run dev   # For Vite
# or
npm start     # For Create React App
```

---

## Routing

- `/` — Home Page
- `/event/:eventId` — Event Details
- `/cart` — Cart
- `/success` — Booking Confirmation
- `/login` — Login
- `/signup` — Signup
- `/profile` — Profile (protected)

---

## Notes

- No backend server is needed beyond Firebase.
- Use Context API for cart and auth state.
- All event data is loaded from `/src/data/data.js`.
- Booking history is saved and loaded from Firestore.

---

## Author

Sokly Hour

---
