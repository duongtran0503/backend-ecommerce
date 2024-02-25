const userRouter = require('./UserRouter');
const productRouter = require('./ProductRouter');

const routes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.get('/', (req, res) => {
        res.json({
            message: 'server is running!',
        });
    });
};

module.exports = routes;
