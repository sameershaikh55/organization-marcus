const mongoosedb = require("mongoose");
mongoosedb.set('strictQuery', false);

mongoosedb.connect(process.env.DATABASE_URL).then(() => {
  console.log("Database connection successful");
});
