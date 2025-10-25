const express = require('express');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage });

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.post("/upload", upload.single("image"), (req, res) => {
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
            message: "파일이 성공적으로 삭제되었습니다."
        });
    });
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
    console.log(path.join(__dirname, 'public'));
});