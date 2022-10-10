const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


exports.signup = (req, res)=> {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then( ()=> res.status(201).json({message: 'Utilisateur enregistré'}))
                .catch(err => res.status(400).json({err}));
        })
        .catch(err => res.status(500).json({err}));
};

exports.login = (req, res, next)=> {
    User.findOne({email: req.body.email})
        .then(user =>{
            if (user === null){
                res.status(401).json({message :'utiisateur non trouvé' });
            } else {
                bcrypt.compare (req.body.password, user.password)
                    .then(valid=>{
                        if(!valid){
                            res.staus(401).json({message:'identifiant ou mot de passe incorrect'});
                        } else {
                            res.status(200).json({
                                userId:user._id,
                                token: jwt.sign(
                                    {userId: user._id},
                                    'RANDOM_TOKEN',
                                    {expiresIn:'24h'})
                            });
                        }
                    })
                    .catch(err=>{res.status(500).json(err)})
            }
        })
        .catch(err => res.status(500).json({err}));
};

