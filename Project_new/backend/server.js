const express = require('express')

const app = express();

const cors = require('cors');

// Cho phép truy cập từ tất cả các domain
app.use(cors());

app.get("/api", (req, res) => {
    res.json({ "users": ["user"] })
} )

app.listen(5000, () => {console.log("Server đã khởi động tại port 5000")} )