const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('decoration'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send({ message: 'File uploaded successfully!', filePath: `/uploads/${req.file.filename}` });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
