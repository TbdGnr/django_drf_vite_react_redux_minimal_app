# 🍕 Micro-App Fullstack – Django / DRF / React / Redux / Vite

Cette micro-application web fullstack montre comment faire cohabiter efficacement plusieurs technologies modernes :

## 🛠️ Technologies utilisées

### 🔙 Backend
- **Django** — Framework Python robuste pour construire une base de données et une API rapidement.
- **Django REST Framework** — Extension de Django pour exposer les données sous forme d'API RESTful.

### 🔜 Frontend
- **Vite.js** — Outil de build ultra-rapide, alternative moderne à Create React App.
- **React.js** — Bibliothèque JavaScript pour construire une interface utilisateur dynamique.
- **Redux.js (Toolkit)** — Système de gestion d’état centralisé côté client.

---

## 📦 Fonctionnalités

L’application simule un système de commande à la Uber Eats pour des **pizzas**.  
Chaque commande est liée à un **numéro de téléphone**.

### 🔄 Parcours utilisateur

- 🧾 **Saisie du numéro de téléphone** pour commencer une commande.
- ➕ **Ajout/Suppression de pizzas** depuis une liste de produits.
- 💾 Si l’utilisateur quitte avant d’avoir terminé, **la commande est automatiquement récupérée** lorsqu’il saisit à nouveau son numéro.
- ✅ Une fois prêt, il peut **valider la commande**.
- 🎁 Sur la page de confirmation, **un code promo `PROMO10` applique une réduction de 10€** si la commande dépasse 30€.

---

# 🚀 Installation
## 🐳 Docker (facile)
⬇️ Docker doit être installé

```bash
git clone https://github.com/TbdGnr/django_drf_vite_react_redux_minimal_app
cd django_drf_vite_react_redux_minimal_app
docker compose up --build
```

Ouvrez ```http://localhost:4173/``` dans un navigateur

## Installation classique
### ✅ Prérequis
- Python 3.x
- `npm` (Node.js) et Vite.js

---

### 📁 Étapes d’installation


#### 1. Backend Django (dans un premier terminal)

```bash
git clone https://github.com/TbdGnr/django_drf_vite_react_redux_minimal_app
cd uber_eats/backend
python -m venv venv
```

**Activer l’environnement virtuel :**
- macOS/Linux :
  ```bash
  source venv/bin/activate
  ```
- Windows :
  ```bash
  venv\Scripts\activate.bat
  ```

**Installer les dépendances :**
```bash
pip install -r requirements.txt
```

**Lancer le serveur :**
```bash
python uber_eats/manage.py runserver
```

---

#### 2. Frontend React (dans un second terminal)

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Accès à l'application

- Application cliente : [http://localhost:5173/](http://localhost:5173/)
- Interface d’administration Django : [http://localhost:8000/admin](http://localhost:8000/admin)

### 👤 Connexion admin (pour gérer les produits)

Un compte admin est préconfiguré :

- **Nom d’utilisateur** : `thibaud`  
- **Mot de passe** : `1234`
