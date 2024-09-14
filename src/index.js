require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const middlewareLogRequest = require('./middleware/logs');
const booksRoutes = require('./routes/books');
const membersRoutes = require('./routes/members');
const loansRoutes = require('./routes/loans');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Initialize the Express application
const app = express();

// Swagger Configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'API untuk mengelola perpustakaan',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Mengambil dokumentasi dari file routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware to log requests
app.use(middlewareLogRequest);

// Middleware to parse JSON requests
app.use(express.json());

// Routes for handling /books endpoint
app.use("/books", booksRoutes);

// Routes for handling /members endpoint
app.use('/members', membersRoutes);

// Routes for handling /loans endpoint
app.use('/loans', loansRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server berhasil di running di port ${PORT}`);
});
