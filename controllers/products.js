
//on importe le schema de données crée avec mongoose
const Product = require('../models/product');

//demande de l'ensemble des produits
exports.findAllProducts = (req, res) => {
    Product.find()
      .then(products => res.status(200).json(products))
      .catch(error => res.status(400).json({ error }));
  };

//demande d'un produit selon son id 
exports.findOneProduct = (req, res, next) => {
    Product.findOne({ _id: req.params.id })
      .then(product => res.status(200).json(product))
      .catch(error => res.status(404).json({ error }));
  };

//création d'un nouvel article dans la BdD
exports.createProduct = (req, res) => {
    //on supprime l'id généré par le navigateur lors de la requete
      delete req.body._id;
      const product = new Product({...req.body});
      product.save()
        .then(() => res.status(201).json({ message: 'Article enregistré !'}))
        .catch(error => res.status(400).json({ error }));
    };

//modification d'un produit dans la BdD
exports.modifyProduct = (req, res) => {
    //on modifie l'ID généré par mongoose par celui de la requete (provenant de MongoDB)
    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Article modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

//suppression d'un produit
exports.deleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Article supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };

