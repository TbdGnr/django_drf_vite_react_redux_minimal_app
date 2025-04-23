# 🍕 Micro Fullstack App – Django / DRF / React / Redux / Vite

This is a minimal fullstack web application that demonstrates how to make modern technologies work seamlessly together:

## 🛠️ Tech Stack

### 🔙 Backend
- **Django** — A robust Python framework to quickly build backend logic and manage databases.
- **Django REST Framework (DRF)** — A powerful toolkit for exposing Django models via a RESTful API.

### 🔜 Frontend
- **Vite.js** — A blazing-fast build tool and development server, a modern alternative to Create React App.
- **React.js** — A declarative JavaScript library for building user interfaces.
- **Redux (with Redux Toolkit)** — A predictable client-side state management library.

---

## 📦 Features

The app simulates a simple **pizza ordering flow** à la Uber Eats.  
Each order is tied to a **phone number**.

### 🔄 User flow

- 🧾 **Enter a phone number** to begin a new order.
- ➕ **Add/Remove pizzas** from a list of available products.
- 💾 If the user closes the app, the order can be **recovered later by re-entering the same phone number**.
- ✅ Once ready, the user can **confirm the order**.
- 🎁 On the confirmation page, entering the code `PROMO10` will apply a **€10 discount** for orders over €30.

---

## 🚀 Installation

### ✅ Prerequisites
- Python 3.x
- `npm` and Vite.js

---

### 📁 Setup Instructions

#### 1. Backend – Django (in the first terminal)

```bash
git clone https://github.com/TbdGnr/uber_eats
cd uber_eats/backend
python -m venv venv
```

**Activate the virtual environment:**
- macOS/Linux:
  ```bash
  source venv/bin/activate
  ```
- Windows:
  ```bash
  venv\Scripts\activate.bat
  ```

**Install dependencies:**
```bash
pip install -r requirements.txt
```

**Start the server:**
```bash
python uber_eats/manage.py runserver
```

---

#### 2. Frontend – React (in a second terminal)

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Access the App

- Frontend App: [http://localhost:5173/](http://localhost:5173/)
- Django Admin: [http://localhost:8000/admin](http://localhost:8000/admin)

### 👤 Admin credentials

An admin account is pre-configured to manage products:

- **Username**: `thibaud`  
- **Password**: `1234`
