// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// Parse requests of content-type - application/json
app.use(bodyParser.json());
const allowedStatic = [
	'http://localhost:3000',
	'https://hack-rx4-0-main-fq2tqzxzs-nayanika-12s-projects.vercel.app',
	'https://hack-rx4-0-main.vercel.app'
];

const corsOptions = {
	origin: (origin, callback) => {
		if (!origin) return callback(null, true); // allow server-to-server/curl
		const vercelPreview = /\.vercel\.app$/i.test(origin);
		if (allowedStatic.includes(origin) || vercelPreview) return callback(null, true);
		return callback(new Error('Not allowed by CORS'));
	},
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Set up additional security headers using Helmet
app.use(helmet());

// Connect to MongoDB
require('./db');

// Import routes
const testRoutes = require('./routes/test.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const transactionRoutes = require('./routes/transaction.routes');
const budgetRoutes = require('./routes/budget.routes');


// Register routes
app.use('/test', testRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/transactions', transactionRoutes);
app.use('/budget', budgetRoutes);

// Basic health endpoints
app.get('/', (req, res) => {
	res.status(200).send('OK');
});

app.get('/health', (req, res) => {
	res.status(200).json({ status: 'ok' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
