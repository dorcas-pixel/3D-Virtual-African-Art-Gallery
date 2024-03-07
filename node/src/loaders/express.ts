import express, { Application } from "express";
import path from "path";
import expressLayouts from "express-ejs-layouts"
import connectDB from "../config/database";
import routes from "../api/routes";
import cors from "cors"


export default async (app: Application) => {
    app.set('view engine', 'ejs');
    app.set('views', path.resolve(`${__dirname}/../../src/views`));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(expressLayouts);

    // app.use(cors());

    await connectDB()

    routes(app);
};
