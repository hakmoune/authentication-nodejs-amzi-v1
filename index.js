const app = require("./app"); //Fair appelle a notre Express Application

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Listening on port", port);
});
