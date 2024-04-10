### Product Management System Unit Testing

Product Management System is the backend server that use to manage product.
From the previous version, I have already implementing unit tests with Jest.

So, in this version I will tried the different test library to implement unit testing.

#### I use Mocha.js to implement unit testing in this project

Because I already implement the thing they want but that doesn't mean I didn't tried anything new this round!

### Installation

`git clone https://github.com/Celesca/product-management-system.git`

`cd product-management-system`

`npm start`

Then trying API endpoints with Postman or Web Browser at Port 3000.
You can track the database by open your MongoDBCompass with Uri mongodb://localhost:27017.

### Docker

`docker-compose up --build`

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

