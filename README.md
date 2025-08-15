# 🌍 GlobexMart Pro – International Product Dashboard

A role-based, real-time **Product Dashboard** built with **React** and **Firebase**, designed to manage international products efficiently.  
Includes **Firebase Authentication** with role separation (**Viewer** & **Admin**) and **Redux Toolkit** for optimized state management.

---

## 🚀 Live Demo

[🔗 View Live Project](https://globex-mart-pro.netlify.app/)

*(Replace with your deployed project link.)*

---

## 📖 Description

**GlobexMart Pro** is a modern web application for managing products with role-based access.  
It allows businesses to keep track of product data in real-time with Firebase as the backend.

- **Viewer Role**: Can browse and view all available products.
- **Admin Role**: Can **add**, **edit**, and **delete** products.
- **Real-Time Updates**: Changes are instantly reflected across all sessions.
- **Secure Authentication**: Firebase Auth ensures only authorized users access specific actions.
- **Global Management**: Built to handle international product listings.

---

## ✨ Features

- 🔐 **Role-Based Authentication** using Firebase
- 👀 **Viewer Role** – Read-only access
- ✏️ **Admin Role** – Full CRUD control
- ⚡ **Real-Time Database** with Firebase
- 🗄 **Redux Toolkit** for centralized state management
- 🎨 Responsive UI built with modern React best practices
- ⚙️ Easy deployment on hosting platforms like Netlify, Vercel, or Firebase Hosting

---

## 🛠 Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| **Frontend**| React (Vite)                        |
| **Backend** | Firebase Realtime Database          |
| **Auth**    | Firebase Authentication             |
| **State**   | Redux Toolkit                       |
| **Styling** | CSS / Modern UI Patterns            |
| **Build**   | Vite                                |

---

## 📂 Project Structure
```
GlobexMart-Pro-International-Product-Dashboard/
├── public/
├── src/
│ ├── components/ # UI Components
│ ├── pages/ # Dashboard & Auth pages
│ ├── redux/ # Redux Toolkit slices & store
│ ├── firebase.js # Firebase config & setup
│ └── App.jsx # Main app component
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🖥 Installation & Setup

1️⃣ **Clone the Repository**
```bash
git clone https://github.com/abhi-bochare/GlobexMart-Pro-International-Product-Dashboard.git
cd GlobexMart-Pro-International-Product-Dashboard
```

2️⃣ **Install Dependencies**

```bash
npm install
```

3️⃣ **Configure Firebase**

Create a Firebase project at Firebase Console

Enable Authentication (Email/Password or desired method)

Enable Realtime Database

Create a .env file and add:

```.env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4️⃣ **Run Locally**

```bash
npm run dev
```
Visit: http://localhost:5173


🤝 **Contributing**
Contributions are welcome! Please fork this repo, create a branch, and submit a PR.
