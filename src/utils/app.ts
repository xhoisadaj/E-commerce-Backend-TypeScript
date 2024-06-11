import { Express } from "express";
import { DataSource } from "typeorm";
// Inside app.ts in the utils directory
import express from 'express';
export const app = express();

export const initializeApp = (app: Express, port: number | string, dataSource: DataSource) => {
  dataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });
};
