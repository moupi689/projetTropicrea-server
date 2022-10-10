const multer = require('multer');

const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpeg',
    'image/png' : 'png',
    'image.webp' : 'webp'
};

//cofigure le chemin et le nom des fichiers entrants
const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, 'images')  //dossier ou seront stockés les ficheirs
    },
    filename: (req, file,callback)=>{
        const name = file.originalname.split(' ').join('_'); //nom du fichier, espaces remplacés par des _
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension) //nomdu fichier: nom original + date + . + extension
    }
});

module.exposrts = multer({storage}).single('image');