import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import menShoes from './routers/men/shoes.js';
import users from './routers/user/index.js';
import orders from './routers/orders/index.js';

const app = express();
const PORT = process.env.port || 5000;
const URI =
    'mongodb+srv://admin:lhv01638698223@cluster0.hovj359.mongodb.net/?retryWrites=true&w=majority';

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

app.use('/', users);
app.use('/men', menShoes);
app.use('/orders', orders);

mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to db');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.log('error', err));
