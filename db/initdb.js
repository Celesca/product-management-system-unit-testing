const mongoose = require('mongoose');

let url;
if (process.env.DOCKER_ENV === 'true') {
    // Running with Docker
    url = 'mongodb://mongo:27017/productDB';
} else {
    // Running without Docker
    url = 'mongodb://localhost:27017/productDB';
}

const connectDb = () => {
    mongoose.connect(url)
            .then(() => {
              console.log('Connected to MongoDB');
            })
              .catch((err) => {
              console.error('Error connecting to MongoDB:', err);
            });
};

module.exports = connectDb;