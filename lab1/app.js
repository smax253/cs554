const setupRoutes = require('./routes/index');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let totalReqCount = 0;
app.use((req, res, next) => {
    totalReqCount++;
    console.log(`Total Requests: ${totalReqCount}`);
    next();
});

app.use((req, res, next) => {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const httpVerb = req.method;
    const reqBody = req.body;
    console.log(`${httpVerb} ${fullUrl}: `, reqBody);
    next();
});

const urlPathCount = {};

app.use((req, res, next) => {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    if (!urlPathCount[fullUrl]) urlPathCount[fullUrl] = 1;
    else urlPathCount[fullUrl] += 1;
    console.log(`URL: ${fullUrl} -- Visits: ${urlPathCount[fullUrl]}`);
    next();
});

setupRoutes(app);
app.listen(3000, () => {
    console.log('server running on port 3000');
});
