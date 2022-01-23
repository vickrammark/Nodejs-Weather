const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const geocode = require("../utils/geocode")
const publicDirectoryPath = path.join(__dirname, "../public");
const viewDirectoryPath = path.join(__dirname, "../template/views");
const partialDirectoryPath = path.join(__dirname, "../template/partials");
const port = process.env.PORT || 3000;
app.set("view engine", "hbs");
app.set("views", viewDirectoryPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialDirectoryPath);
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Vickram",
    });
});
app.get("/weather", async(req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide address to provide the weather data!!",
        });
    }
    const result = await geocode.start(req.query.address);
    return res.send(result);
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "Weather App",
        name: "Vickram",
    });
});
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Weather App",
        name: "Vickram",
        message: "This is help message",
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Help Page Not Found",
        message: "Help Article Not Found",
        name: "Vickram",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "Page Not Found",
        message: "Page you are looking for is not present!!",
        name: "Vickram",
    });
});

app.listen(port, () => {
    console.log(`Server is up and runing in ${port}`);
});