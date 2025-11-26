const app = require('./app');
const PORT = process.env.PORT || 3000;

// 서버 실행
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});