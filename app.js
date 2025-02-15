const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const fs = require("fs");
const logger = require("./logger");

//reading json data for products
const products = fs.readFileSync(
  path.join(__dirname, "assets", "products.json"),
  "utf-8"
);

//reading json data for users
const users = fs.readFileSync(
  path.join(__dirname, "assets", "users.json"),
  "utf-8"
);

//using logger for every request
app.use(logger);

//static express middleware where it loads everything needs for the html
//page
app.use(express.static(path.join(__dirname, "assets")));

//get request for /products sends json of products
app.get("/products", (req, res) => {
  res.json(JSON.parse(products));
});

//get request of product id  if product id is not given it'll send "None existent product"
//if id was valid it'll return the product json
app.get("/products/:id", (req, res) => {
  const prodId = req.params.id;
  const productJson = JSON.parse(products);

  const product = productJson.find((el) => {
    return el.id == prodId;
  });

  !product && res.status(404).send("None existent product");

  res.status(200).json(product);
});

// gets all users if no age was given
// gets users with age bigger than given age query if an age was given
app.get("/users", (req, res) => {
  const { age } = req.query;

  allUsers = JSON.parse(users);

  (age && res.json(allUsers.filter((el) => el.age > Number(age)))) ||
    res.json(JSON.parse(users));
});

//for any other requests that are not available it'll send the 404 not found html page
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "assets", "404.html"));
});

//or

//for any other requests that are not available it'll send the 404 not found html page
// app.all("*", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "assets", "404.html"));
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
