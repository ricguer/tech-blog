const routes = require("./controllers");

const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(routes);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});