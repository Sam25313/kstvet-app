const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


const http = require('http');
const { Server } = require("socket.io");

const authRoutes = require('./routes/authRoutes');
const ministriesRoutes = require('./routes/ministriesRoutes');
const registration = require('./routes/registration');
const usersRoutes = require('./routes/usersRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const sermonsRoutes = require('./routes/sermonsRoutes');
const contactRoutes = require('./routes/contactRoutes');
const subscriptionsRoutes = require('./routes/subscriptionsRoutes');

dotenv.config();

const app = express();


const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

 app.use(cors({ origin: 'http://localhost:5173',
     credentials: true,
       exposedHeaders: ['Content-Range'] }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', ministriesRoutes);
app.use('/api', registration);
app.use('/api', usersRoutes);
app.use('/api', eventsRoutes);
app.use('/api', sermonsRoutes);
app.use('/api', contactRoutes);
app.use('/api', subscriptionsRoutes);



const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kstvetcu';
mongoose.connect(MONGO_URI)
.then(() =>console.log('Connected to MongoDB..'))
.catch(err => console.error('Could not Connect to MongoDB...', err))


server.listen(PORT, ()=>{
    console.log(`Server running on http://localhost: ${PORT}`)
});