/* eslint-disable no-unused-vars */
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config();
const app = express();

// use middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
//through by 2 setting or 2 middleware

mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1/fishing_web', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
    res.send('Sever is ready');
});
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
console.log('port', port);
app.listen(port, () => {
    console.log(`Sever at http://localhost:${port}`);
});