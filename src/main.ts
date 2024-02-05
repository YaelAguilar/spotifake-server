// src/main.ts
import express from 'express';
import http from 'http';
import { initializeWebSocketServer } from './config/websocket';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './infrastructure/routes/userRoutes';

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB Atlas', err));

app.use('/api/users', userRoutes);

const server = http.createServer(app);
initializeWebSocketServer(server);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
