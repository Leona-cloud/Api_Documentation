const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const book = require("./Routes/books");
const app = express();

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