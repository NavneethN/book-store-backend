import express, { request } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());
// app.use (cors(
//     {
//         origin: 'https://localhost:5555',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     }
// ));
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome');
});

app.use('/books',booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`listening on ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });