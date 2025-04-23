# Micro application de commande de Pizza

 - Backend : 
    - Django
    - Django REST Framework
 - Frontend : 
    - Vite.js
    - React
    - Redux

Cette application contient une structure minimale d'application DRF/React

# Installation
## Requis : 
 - Python 3
 - npm / Vite.js

## Étapes d'installation
 - Ouvrir un premier terminal :
   - ```git clone https://github.com/TbdGnr/uber_eats```
   - ```cd uber_eats/backend```
   - ```python -m venv venv```
   - macOS/Linux :
      - ```source venv/bin/activate```
   - Windows :
      - ```venv\Scripts\activate.bat``` sur Windows
   - ```pip install -r requirements.txt```
   - ```python uber_eats/manage.py runserver```
 - Ouvrir un second terminal
   - ```cd frontend```
   - ```npm install```
   - ```npm run dev```

## Accéder à l'app

Accédez à ```http://localhost:5473/``` sur un navigateur web pour l'application
Accédez à ```http://localhost:8000/admin``` pour modifier les produits de l'application.
Pour changer les produits disponibles, un compte d'admin existe déjà :
 - username : thibaud
 - mot de passe : 1234
