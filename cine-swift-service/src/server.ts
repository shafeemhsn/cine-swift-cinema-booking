import dotenv from "dotenv";

import { app } from "./app";
import { AppDataSource } from "./config/postgres-db";

dotenv.config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established");

    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during database initialization:", error);
  });
