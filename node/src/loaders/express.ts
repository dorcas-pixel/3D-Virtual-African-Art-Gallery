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

    if (process.env.NODE_ENV == "production") {
        app.use(express.static(path.join(__dirname, '../../../react/dist')));

        const routes = [
           "/",
            "/sign-in",
            "/sign-up",
            "/gallery",
            "/marketplace",
            "/marketplace/:artworkId",
            "/checkout",
            "/checkout/success",
            "/u/:username",
            "/u/:username/spaces",
            "/u/:username/cart",
            "/u/:username/orders",
            "/u/:username/profile"
        ];

        app.get(routes, function (_, res) {
            res.sendFile(path.join(__dirname, '../../../react/dist', 'index.html'));
        });
    }

    routes(app);
};
