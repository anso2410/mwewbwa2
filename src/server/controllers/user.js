const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                color: req.body.color,
            });

            if (
                !user.username ||
                !user.email ||
                !user.password ||
                !user.color
            ) {
                return res
                    .status(400)
                    .json({error: "Please fill up all fields!"});
            }
            // Register to DB
            user.save()
                .then(() => res.status(201).json({message: "User created!"}))
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};
/*
exports.signup = (req, res, next) => {
    User.find().estimatedDocumentCount()
        .then(count => {
            let totalAmountOfPlayers = count;
            User.find()
                .then(users => {
                    let totalAmountOfLeavesInGame = users.forEach(user => totalNumberOfLeavesInGame += user.number_of_leaves);

                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            const user = new User({
                                username: req.body.username,
                                email: req.body.email,
                                password: hash,
                                color: req.body.color,
                                number_of_trees: 3, // calculer en fonction de table tree-user > assigner au new user 3 random free tree (tree où aucun owner)
                                number_of_leaves: Math.floor(totalAmountOfLeavesInGame / totalAmountOfPlayers)
                                });

                            if (!user.username || !user.email || !user.password || !user.color)
                            {
                                return res.status(400).json({error: 'Please fill up all fiels!'});
                            }
                            // Register to DB
                            user.save()
                                .then(() => res.status(201).json({message: 'User created!'}))
                                .catch(error => res.status(500).json({ error }));
                        })
                        .catch(error => res.status(500).json({error}));
                })
                .catch(error => res.status(500).json({error}));
            }
        )
        .catch(error => res.status(500).json({error}));
};*/

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: "User not found!"});
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res
                            .status(401)
                            .json({error: "Password incorrect!"});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            "RANDOM_TOKEN_SECRET",
                            {expiresIn: "24h"},
                        ),
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.updateUser = (req, res, next) => {
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
};

exports.deleteUser = (req, res, next) => {
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
};
