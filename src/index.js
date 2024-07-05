require("reflect-metadata");
const express = require("express");
const { createConnection } = require("typeorm");
const airportRouter = require("./controller/AirportController");

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

createConnection().then(() => {
    app.use("/airport", airportRouter);

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}).catch(error => console.log(error));
