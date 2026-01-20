const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/products');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename =
            Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
        cb(null, filename);
    },
});

const uploadProductImage = multer({ storage });

module.exports = uploadProductImage;
