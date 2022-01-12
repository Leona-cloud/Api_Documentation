const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const book = require("./Routes/books");
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: "3.0.0",
    info:{
      title: "Books API",
      version: "1.0.0",
      description: "A simple Api for books"
    },
    servers: [
      {
        url: "http://localhost:3000/books"
      }
    ],
  },
  apis: ["./Routes/*.js"]
}

const specs = swaggerJsDoc(options)

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, { explorer: true }))

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/books", book);


dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.error("unable to connect", err));



  const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}.....`);
});
