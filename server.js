                                                                /* ===================== IMPORTS ====================== */
const path = require("path");                                   /* Import "path" module                                 */
const express = require("express");                             /* Import "express" module                              */
const session = require("express-session");                     /* Import "express-session" module                      */
const exphbs = require("express-handlebars");                   /* Import "express-handlebars" module                   */
const routes = require("./controllers");                        /* Import "controllers" directory                       */
const sequelize = require("./config/connection");               /* Import "connection" from "config" directory          */

                                                                /* ============= EXPRESS SERVER CONFIG ================ */
const app = express();                                          /* Create an instance of the express app                */
const PORT = process.env.PORT || 3001;                          /* Set the port to listen on                            */

                                                                /* =============== SESSION CONFIGURATION ============== */
const sess = {
    secret: "Even more super secret secret",
    resave: false,
    saveUninitialized: false,
}


                                                                /* =============== HANDLEBARS CONFIG ================== */
const hbs = exphbs.create({});                                  /* Create an instance of the handlebars engine          */
app.engine("handlebars", hbs.engine);                           /* Set the app to use handlebars as the template engine */
app.set("view engine", "handlebars");                           /* Set the default view engine to handlebars            */


                                                                /* ==================== MIDDLEWARE ==================== */
app.use(express.json());                                        /* Parse incoming JSON data                             */
app.use(express.urlencoded({ extended: true }));                /* Parse incoming URL-encoded data                      */
app.use(express.static(path.join(__dirname, 'public')));        /* Serve static files from the "public" directory       */
app.use(session(sess));                                         /* Use the session defined above                        */
app.use(routes);                                                /* Use the routes defined in "controllers" directory    */


                                                                /* ================== APP LISTENER ==================== */
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
});
