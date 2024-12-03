const express = require('express');
const app = express()
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
 const {notFound, errorHandler} = require('./middleware/errorMiddleware');
const { authUser } = require('./controllers/authController');

 dotenv.config();
 connectDB();
;

 //setting up middlewares
 app.use(express.json());
 app.use('/api/users', authRoutes)
 app.use('/api/products', productRoutes)
 app.use('/api/orders', orderRoutes)

 app.use(notFound);
 app.use(errorHandler);

 const PORT = process.env.PORT || 5000;
 app.listen(PORT, console.log(`Server running on port ${PORT}`));