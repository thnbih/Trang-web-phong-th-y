const express = require('express');
const path = require('path');
const app = express();

// setup static and middleware
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
});

// app.all('*', (req, res) => {
//     res.status(400).send('Page not found');
// });
app.get('/bai-viet-blog', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, './routes/BaiVietBlog.html'));
});

app.get('/cua-hang', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, './routes/Cuahang.html'));
});

app.get('/dich-vu', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, './routes/DịchVu.html'));
});

app.get('/livestream', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, './routes/LiveStream.html'));
});

app.get('/gioi-thieu', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, './routes/GioiThieu.html'));
});

app.get('/lien-he', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, './routes/LienHe.html'));
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
