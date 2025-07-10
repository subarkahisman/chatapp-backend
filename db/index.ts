import { connect } from "mongoose";

const mongoURI = process.env.DATABASE_URL!;

connect(mongoURI)
  .then(() => {
    console.log("Database berhasil connect");
  })
  .catch((err) => {
    console.log(err);
  });
