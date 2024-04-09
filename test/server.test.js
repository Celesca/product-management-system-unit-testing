const app = require('../server');
const request = require('supertest');
const assertion = require('assert');
const { connect, closeDatabase, clearDatabase, insertData  } = require('./mockdb');

require("dotenv").config();

const products = [
    { _id: 1, name: 'Laptop', category: 'Electronics', price: 1000, stock: 5 },
    { _id: 2, name: 'Typescript Fundamental', category: 'Books', price: 150, stock: 2 },
    { _id: 3, name: 'Clean code', category: 'Books', price: 1500, stock: 1 }
];

describe('Test request with mongoose', () => {

    beforeEach(async () => {
        await insertData(products);
    });

    before(async () => {
        await connect();
        await clearDatabase();
    });

    afterEach(async () => {
        await clearDatabase();
    });

    after(async () => {
        await closeDatabase();
    });

    // GET /products

    describe("Test GET /products", async () => {
        it("should return all products", async () => {
            await request(app)
                .get("/products")
                .expect(200)
                .r
        });
    });

    describe("Test GET /product/:id ", async() => {
        it("should return a single product id 1", async() => {
            await request(app)
                .get("/products/1")
                .expect(200)
                .then((res) => {
                    assertion.strictEqual(res.body._id, 1);
                })
        
        })
    })

    describe("Test GET /product/:id with no product in database", async() => {
        it("should return a 404", async() => {
            await request(app)
                .get("/products/100")
                .expect(404)
                .then((res) => {
                    assertion.strictEqual(res.body.message , "Product not found")
                })
        })
    })

    describe("Test GET /products/:id with invalid id", async() => {
        it("should return a 400", async() => {
            await request(app)
                .get("/products/-1")
                .expect(400)
                .then((res) => {
                    assertion.strictEqual(res.body.message, "Product ID must be greater than 0")
                })
        })
    })

    describe("Test GET /products/:id with string id", async() => {
        it("should return a 400", async() => {
            await request(app)
                .get("/products/hello")
                .expect(400)
                .then((res) => {
                    assertion.strictEqual(res.body.message, "Invalid Product ID")
                })
        })
    });

    // POST /products

    describe("Test POST /product normal", async() => {
        it("should create a new product", async() => {
            await request(app)
                .post("/products")
                .send({
                    name: "C++",
                    category: "Books",
                    price: 350,
                    stock: 1
                })
                .expect(200)
                .then((res) => {
                    assertion.strictEqual(res.body._id, 4);
                    assertion.strictEqual(res.body.name, "C++");
                    assertion.strictEqual(res.body.category, "Books");
                    assertion.strictEqual(res.body.price, 350);
                    assertion.strictEqual(res.body.stock, 1);
                })
        })
    })

    describe("Test POST /product Invalid Request", async() => {
        it("should return a 400", async() => {
            await request(app)
                .post("/products")
                .send({
                    name: "C++",
                    category: "Books",
                    price: 350
                })
                .expect(400)
                .then((res) => {
                    assertion.strictEqual(res.body.message, "Invalid request body");
                })
        })
    })

    describe('Test POST /product String Stock', async() => {
        it("should return a 400", async() => {
            await request(app)
                .post("/products")
                .send({
                    name: "C++",
                    category: "Books",
                    price: 350,
                    stock: "hello"
                })
                .expect(400)
                .then((res) => {
                    assertion.strictEqual(res.body.message, "Invalid request body");
                })
        })
    })

    describe('Test POST /products Minus price', async() => {
        it("should return a 400", async() => {
            await request(app)
                .post("/products")
                .send({
                    name: "C++",
                    category: "Books",
                    price: -350,
                    stock: 1
                })
                .expect(400)
                .then((res) => {
                    assertion.strictEqual(res.body.message, "Price and Stock must be greater than 0");
                })
        })
    })

    describe('Test POST /products Minus stock', async() => {
        it("should return a 400", async() => {
            await request(app)
                .post("/products")
                .send({
                    name: "C++",
                    category: "Books",
                    price: 350,
                    stock: -1
                })
                .expect(400)
                .then((res) => {
                    assertion.strictEqual(res.body.message, "Price and Stock must be greater than 0");
                })
        })
    })

    // PUT /products/:id
    describe('Test PUT /products/:id normal', async() => {
        it("should update a product", async() => {
            await request(app)
                .put("/products/1")
                .send({
                    name: "Updated Product",
                    category: "Updated Category",
                    price: 200,
                    stock: 20
                })
                .expect(200)
                .then((res) => {
                    assertion.strictEqual(res.body._id, 1);
                    assertion.strictEqual(res.body.name, "Updated Product");
                    assertion.strictEqual(res.body.category, "Updated Category");
                    assertion.strictEqual(res.body.price, 200);
                    assertion.strictEqual(res.body.stock, 20);
                })
        })
    })

    describe('Test PUT /products/:id with no id in products', async() => {
        it("should return a 404", async() => {
            await request(app)
                .put("/products/100")
                .send({
                    name: "Updated Product",
                    category: "Updated Category",
                    price: 200,
                    stock: 20
                })
                .expect(404)
                .then((res) => {
                    assertion.strictEqual(res.body.message, "Product not found");
                })
        })
    })

    describe('Test PUT /products/:id with invalid id', async() => {
        it("should return a 400", async() => {
            await request(app)
                .put("/products/-1")
                .send({
                    name: "Updated Product",
                    category: "Updated Category",
                    price: 200,
                    stock: 20
                })
                .expect(400)
                .then((res) => {
                    assertion.strictEqual(res.body.message, "Invalid Product ID");
                })
        })
    })

    describe('Test PUT /products/:id Invalid Request', async() => {
        it("should return a 400", async() => {
            await request(app)
                .put("/products/1")
                .send({
                    name: "Updated Product",
                    category: "Updated Category",
                    price: 200
                })
                .expect(400)
                .then((res) => {
                    assertion.strictEqual(res.body.message, "Invalid request body");
                })
        })
    })

    describe('Test PUT /products/:id string stock', async() => {
        it("should return a 400", async() => {
            await request(app)
                .put("/products/1")
                .send({
                    name: "Updated Product",
                    category: "Updated Category",
                    price: 200,
                    stock: "hello"
                })
                .expect(400)
                .then((res) => {
                    assertion.strictEqual(res.body.message, "Invalid request body");
                })
        })
    })

    describe("Test PUT /products/:id Minus stock", async() => {
        it("should return a 400", async() => {
            await request(app)
                .put("/products/1")
                .send({
                    name: "Updated Product",
                    category: "Updated Category",
                    price: 200,
                    stock: -20
                })
                .expect(400)
                .then((res) => {
                    assertion.strictEqual(res.body.message, "Price and Stock must be greater than 0");
                })
        })
    })

    // DELETE /products/:id

    describe('Test DELETE /products/:id normal', async() => {
        it("shoule return a 200", async() => {
            await request(app)
                .delete("/products/1")
                .expect(200)
                .then((res) => {
                    assertion.strictEqual(res.body.message, "Product deleted");
                })
        })
    })

    describe('Test DELETE /products/:id with no id in products', async() => {
        it("should return a 404", async() => {
            await request(app)
                .delete("/products/100")
                .expect(404)
                .then((res) => {
                    assertion.strictEqual(res.body.message, "Product not found");
                })
        })
    })

    describe('Test DELETE /products/:id with invalid id' , async() => {
        it("should return a 400", async() => {
            await request(app)
                .delete('/products/-1')
                .expect(400)
                .then((res) => {
                    assertion.strictEqual(res.body.message, "Invalid Product ID");
                })
        })
    })

    describe('Test DELETE /products/:id with string id', async() => {
        it("should return a 400", async() => {
            await request(app)
                .delete('/products/hello')
                .expect(400)
                .expect((res) => {
                    assertion.strictEqual(res.body.message, "Invalid Product ID");
                })
        })
    })

});