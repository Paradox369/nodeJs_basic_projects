const { application } = require("express");
const express = require("express");
const { products } = require("./data");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello and welcome!</h1><a href='/api/products'>Products</a>");
});

// responding to user requesting all items from the link in the above response, should the user goto link
app.get("/api/products", (req, res) => {
  // creating new array with partial data
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });

  // displaying partial array
  res.json(newProducts);
});

// responding to user requesting specific item
// static way
app.get("/api/products/1", (req, res) => {
  const requestedProduct = products.find((product) => product.id === 1);
  res.send(requestedProduct);
});
// dynamic way(look at link)
// simple example
app.get("/api/products/:pdt_id", (req, res) => {
  // console.log(req)
  // console.log(req.params)
  const { pdt_id } = req.params;

  const requestedProduct = products.find(
    (product) => product.id === Number(pdt_id)
  );
  if (!requestedProduct)
    res.status(404).send("<h1>product does not exist</h1>");
  res.json(requestedProduct);
});
// complicated example
app.get("/api/products/:pdt_id/reviews/:review_id", (req, res) => {
  // console.log(req.params);
  res.send("hello george");
  // WRT the link above, in your web browser, concatenate /api/products/2/reviews/1
});

// how to respond to user specific search request
app.get("/api/v1/query", (req, res) => {
  // the request is destructured into search value and display limit respectively
  const { search, limit } = req.query;
  let searchItems = [...products];

  if (search) {
    searchItems = searchItems.filter((searchItem) => {
      return searchItem.name.startsWith(search);
    });
  }
  if (limit) {
    searchItems = searchItems.slice(0, Number(limit));
  }
  // in the server, add /api/v1/query?search=a&limit=2        im using "a" in the search because there many pdts with names starting with "a"

  // if search yields no results
  if (searchItems < 1) {
    // res.status(200).send("your search yielded no results, try something else");

    res.status(200).json({
      reqSuccess: true,
      data: [],
      note: "search yielded no results. try something else",
    });
  }

  res.status(200).json(searchItems);
});
app.listen(5000, () => console.log("listening on port 5000..."));
