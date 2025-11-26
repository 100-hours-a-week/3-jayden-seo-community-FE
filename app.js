const express = require('express');
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = process.env.UPLOAD_DIR || '/uploads';

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage });

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.post(UPLOAD_DIR, upload.single("file"), (req, res) => {
    res.json({
        success: true,
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`
    })
});

app.delete("/upload/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    fs.unlink(filePath, (err) => {
        if (err){
            return res.status(404).json({
                success: false,
                message: "파일을 찾을 수 없습니다."
            });
        }

        return res.json({
            success: true,
            message: "파일이 성공적으로 삭제되었습니다.",
        });
    });
});
module.exports = app;