/* becodeorg/mwenbwa
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

// Import < ES6 modules syntax, not from CommonJS, which is const express = require(''). CommonJS is the only one working for node.js, but Babel makes it possible to work with ES6 syntax for modules, even for node.
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";

// Import des routes
const treeRoutes = require("./routes/tree");
const userRoutes = require("./routes/user");

const Data = require("./models/data");
const Tree = require("./models/tree");
const User = require("./models/user");

const app = express();

// Process env variables
const {APP_PORT, DB_CLUSTER, DB_DATABASE, DB_USER, DB_PASSWORD} = process.env;

// Connection to MongoDB
mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.jw1ce.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    )
    .then(() => console.log("Connection to MongoDB successful!"))
    .catch(() => console.log("Connection to MongoDB unsuccessful!"));

// Middlewares
app.use(bodyParser.json());
//app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Set le serveur statique servant le bin/client pour les fichiers dont le front (qui est statique) a besoin : tous les HTML et le CSS
// (permet d'avoir accès à l'index.html pour la route "/" notamment.
app.use(express.static(path.resolve(__dirname, "../../bin/client")));

// API Test
app.get("/users", (req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(() => res.status(400).json({error: "No user found!"}));
});

app.get("/users/:id", (req, res) => {
    User.findOne({_id: req.params.id})
        .then(user => res.status(200).json(user))
        .catch(() => res.status(400).json({error: "No user found!"}));
});

/*app.get("/api/trees/:id", (req, res) => {
    Data.findOne({ _id: req.params.id }, (err, doc) => {
        if(err)
        {
            return res.status(400).json({error: `No tree with ${req.params.id} found!`});
        }
        res.status(200).json(doc.nom_complet);
    });
});*/

app.post("/hello", (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        color: req.body.color
    });

    /*if(
        !newUser.username ||
        !newUser.email ||
        !newUser.password ||
        !newUser.color
    ) {
        return res
            .status(400)
            .json({error: "Please fill up all fiels!"});
    }*/

    // Register to DB
    newUser.save()
        .then(() => res.status(201).json({message: "User created!"}))
        .catch(error => res.status(500).json({error}));
});

app.put("/hello/:id", (req, res) => {
    const updatedUser = req.body;
    User.findOne({_id: req.params.id})
        .then(user => {
            user.username = updatedUser.username
                ? updatedUser.username
                : user.username;
            user.email = updatedUser.email ? updatedUser.email : user.email;
            user.password = updatedUser.password
                ? updatedUser.password
                : user.password;
            user.color = updatedUser.color ? updatedUser.color : user.color;
            res.status(200).json({msg: "User updated!", user});
        })
        .catch(() => res.status(400).json({error: "No user found!"}));
});

app.delete("/hello/:id", (req, res) => {
    User.deleteOne({_id: req.params.id})
        .then(data => {
            if (data.deletedCount !== 0) {
                res.status(200).json({msg: "User deleted!"});
            } else {
                res.status(500).json({
                    error: "User couldn't be deleted. Try again.",
                });
            }
        })
        .catch(() => res.status(400).json({error: "No user found!"}));
});

// Routes attendues par le frontend
app.use("/api/tree", treeRoutes);
app.use("/api/auth", userRoutes);
//app.post('/api/auth', (req, res, next) => {
//   res.send(req.body);
//});

// App listening on port
app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
