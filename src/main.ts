import express from 'express';
import path from 'path';
import http from 'http';
import { initializeWebSocketServer } from './config/websocket';
import { upcomingReleasesController } from './infrastructure/controllers/shortPollingController';
import { longPollingController } from './infrastructure/controllers/longPollingController';
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

//socket.io
initializeWebSocketServer(server);

//short polling
app.use(express.static(path.join(__dirname, '../public')));
app.get('/api/upcoming-releases', upcomingReleasesController);

//long polling
app.get('/api/releases/next', longPollingController);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
