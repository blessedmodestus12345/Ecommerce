const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.URL

const connectDB = async ()=>{
    try {
        mongoose.connect(url);
        console.log('Connected to the database')
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB;