const express = require('express');
const path = require("path");

const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
    console.log('hello world!');
    return "public/login.html";
})

// 서버 실행
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
    console.log(path.join(__dirname, 'public'));
});