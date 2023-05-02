const router = require("express").Router();
const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("Users");
const { getUsers } = require("../controllers/UserControlller");


router.post("/user", async (req, res) => {

    try {
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            gender: req.body.gender,
        }
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({msg: "Usuario ja cadastrado!!"})
        }

        await User.create(newUser);
        return res.status(201).json(newUser);

    } catch (err) {
        return res.status(500).send({ msg: err });
    }
});


router.get("/user/:email", async (req, res) => {
    try {

        const user = await User.findOne({ email: req.params.email });

        return res.status(200).json(user);
    } catch (err) {
        return res.status(404).send({ msg: "Não foi possível obter dados!" });
    }
});

/*
router.get("/user", async (req, res) => {
    try {
        const users = await User.find();

        return res.status(200).json(users);
    } catch (err) {
        return res.status(404).send({ msg: "Não foi possível obter dados!" });
    }
});
*/

router.get("/user", getUsers);


router.put("/user/:username", async (req, res) => {
    try {

        const username = req.params.username;
        const user = await User.findOne({ username: username })

        user.username = req.body.username;
        user.password = req.body.password;

        await user.updateOne(user);
        await user.save();
        return res.status(200).json(user)

    } catch (err) {
        return res.status(400).send({ msg: 'Não foi possível editar os dados' });
    }
});


router.delete("/user/:username", async (req, res) => {
    try {

        const username = req.params.username;
        const user = await User.findOne({ username: username })

        user.status = false;

        await user.updateOne(user);
        await user.save();
        res.status(200).json(user)

    } catch (err) {
        return res.status(400).send({ msg: 'Não foi possível eliminar o user' });
    }
});


module.exports = router;