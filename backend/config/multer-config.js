// Enregistrement des images de sauces + modification du nom du fichier pour le rendre unique.
const multer = require('multer');
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'video/mp4': 'mp4',
    'video/avi': 'avi'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'medias')
    },
    filename: (req, file, callback) => {
        const noSpace = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        const name = noSpace.split('.')[0];
        callback(null, name + Date.now() + '.' + extension);
    }
})

module.exports = multer({ storage }).array('file');