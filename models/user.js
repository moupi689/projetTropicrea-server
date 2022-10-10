//on importe mongoose pour la connexion a MongoDB
const mongoose = require('mongoose');

//on importe le package pour la validation de l'unicité des inscriptions
const uniqueValidator = require('mongoose-unique-validator'); 

const userSchema = mongoose.Schema({
    email : { type: String, required:true, unique: true },
    password : { type : String, required:true }
});

//on ajoute avec la methode plugin la fonction unique-validator au schema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model ('User', userSchema);