const mongoose = require("mongoose");
require("dotenv").config();
const mongoString = process.env.DATABASE_URL;

const dbConnection = () => {
  // mongoose
  // .connect("mongodb://0.0.0.0:27017/test", {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // })
  // .then(() => console.log(" Database Connected!"))
  // .catch((err) => console.log(err));

  mongoose.connect(mongoString);
  const database = mongoose.connection;
  console.log(mongoString);
  database.on("error", (error) => {
    console.log(error);
  });

  database.once("connected", () => {
    console.log("Database Connected");
  });
};
module.exports = dbConnection;
