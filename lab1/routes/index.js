const movieRoutes = require('./movies');

const routeConstructor = (app) => {
    app.use('/api', movieRoutes);
    app.use('*', (req, res) => {
        return res.status(404).json({ error: 'Unknown route accessed.' });
    });
};

module.exports = routeConstructor;
