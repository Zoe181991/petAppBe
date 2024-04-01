const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    "mongodb+srv://admin:admin181991@clusterpet.yp3c5w9.mongodb.net/PetsApp",
    { useUnifiedTopology: true, useNewUrlParser: true }
  );
  console.log("Mongoose is connected");
}

const db = mongoose.connection;

module.exports = db;
