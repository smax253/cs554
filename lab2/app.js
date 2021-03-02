const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('*', (req, res) => {
    res.status(404).sendFile(__dirname + '/public/not_found.html');
});

app.listen(3000, () => {
    console.log('Server running on port 3000!');
});
