const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(`${process.env.MONGO_URI}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Mongoose is connected");
}

const db = mongoose.connection;

module.exports = db;
