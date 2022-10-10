//on importe express pour la gestion des routes
const express = require('express');
//on importe morgan pour le logger de requetes
const morgan = require('morgan');
//on importe serve-favicon pour la gestion de la favicon
const favicon = require('serve-favicon');
//on importe le router pour la gestion des routes
const productsRoutes = require('./routes/router');
//on importe le router pour la gestion des utilisateurs
const userRoutes = require('./routes/user');


const app = express();

//on importe mongoose pour la connexion a MongoDB
const mongoose = require('mongoose');

//connection a MongoDB via mongoose
mongoose.connect('mongodb+srv://admin:admin2k!@cluster0.c6uutj6.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB ok'))
  .catch(() => console.log('Erreur connexion à MongoDB'));


//logger (middeware tiers)
app.use(morgan('dev'));

//favicon
app.use(favicon(__dirname + '/favicon.ico'));

//prend les requetes qui ont comme content-type application/json et met le body sur l'objet req (middleware d'application)
app.use(express.json());

//prévention des erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000/');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//affichage du rendu de la page d'accueil (middleware intégré)
app.use(express.static(__dirname));

//affichage du rendu de la page admin
app.use(express.static(__dirname + '/admin'));

//on utilise le routeur pour toutes les requetes entrantes et l'authentification des utilisateurs
app.use('/api/products', productsRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;