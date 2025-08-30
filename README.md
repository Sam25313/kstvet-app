# KSTVET Christian Union Web App

A modern web application built with **React** (frontend) and **Node.js/Express** (backend), designed to manage events, users, and other administrative tasks for the KSTVET Christian Union.

---

## 🚀 Features
- 🔑 User authentication (Admin & Members)
- 📅 Event management (create, edit, publish events)
- 📍 Location & schedule tracking
- 🛠️ Admin dashboard with role-based access
- 📊 Secure REST API with MongoDB
- 🌐 Responsive UI built with React & React-Admin

---

## 🛠️ Tech Stack
**Frontend**
- React
- React Admin
- TailwindCSS (if used)

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose ODM)

---

## 📦 Installation & Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/kstvet-cu-web.git
cd kstvet-cu-web
```

### 2️⃣ Backend setup
```bash
cd Backend
npm install
```

Create a `.env` file in the backend folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:
```bash
npm run dev
```

### 3️⃣ Frontend setup
```bash
cd ../Frontend
npm install
npm run dev
```

---

## 📖 Usage
1. Open backend server → [http://localhost:5000](http://localhost:5000)  
2. Open frontend → [http://localhost:5173](http://localhost:5173)  
3. Login as admin and manage events, users, and schedules.

---

## 🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

---

## 📜 License
This project is licensed under the MIT License.

---

## 👨‍💻 Author
Developed by **Samuel Barasa**  
"# kstvet-app" 
