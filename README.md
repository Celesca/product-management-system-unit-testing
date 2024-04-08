### Product Management System Unit Testing

Product Management System is the backend server that use to manage product.
In this version, I use the MongoDB to store and manage the data instead of Mocking data with JavaScript object.

Thanks to this project I have the opportunities to use MongoDB for first time and writing the unit tests again with Jest
because I need to mock the data in mongodb right? So I use the Mongo server memory to mock data in unit testing.

I also use the Mongoose to connect to MongoDB and arranged the project structure, So it has low coupling and high cohesion.

### Installation

`git clone https://github.com/Celesca/product-management-system.git`

`cd product-management-system`

`npm start`

Then trying API endpoints with Postman or Web Browser at Port 3000.
You can track the database by open your MongoDBCompass with Uri mongodb://localhost:27017.

### Docker

❌ Current unavailable, If I had time, I will come back to implement it.


### API Endpoints Guidelines

* `GET /products`

* `GET /products/:id`

* `POST /products`
  - Request Body : 
    {
      name,
      category,
      price,
      stock
    };

* `PUT /products/:id`
  - Request Body : 
    {
      name,
      category,
      price,
      stock
    };

* `DELETE /products/:id`

