const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const xssClean = require('xss-clean');
const compression = require('compression');
const sequelize = require('./utils/database');
const userRouter = require('./routes/users');

const app = express();

// Implementing CORS
app.use(cors());
app.options('*', cors());

// Set headers
app.use((_req, res, next) => {
	res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	next();
});

// Body parser, reading data from body into req.body
app.use(
	express.json({
		limit: '10kb',
	})
);
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Parse the data from cookie
app.use(cookieParser());

// Data sanitization against XSS
app.use(xssClean());

// Apply the compression middleware
app.use(compression());

// Development logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('tiny'));
}

app.get('/', (req, res) => {
	res.status(200).send('Hello world');
});
// CRUD routes
app.use('/api/users', userRouter);

// Error handling
app.use((error, _req, res, _next) => {
	console.error(error);
	const statusCode = error.statusCode || 500;
	const message = error.message;
	res.status(statusCode).json({ message });
});

// Sync database
sequelize
	.sync()
	.then((result) => {
		console.log('Database connected');
		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
			console.log(`App started on port ${PORT}`);
		});
	})
	.catch((error) => console.error(error));
