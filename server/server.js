const path = require('path')
const publicPath = path.join(__dirname, '/../public');
const express = require('express');
const PORT = process.env.PORT || 1331;

var app = express();
app.use(express.static(publicPath));


app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
});