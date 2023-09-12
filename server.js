const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();
const { URL_DB } = process.env;

mongoose.set("strictQuery", true);
mongoose
  .connect(URL_DB)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
