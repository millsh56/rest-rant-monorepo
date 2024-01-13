const router = require('express').Router()
const { response } = require('express');
const db = require("../models")
const bcrypt = require('bcrypt')

const {User} = db

router.post('/', async (req, res) => {
    console.log('IN HERE')
    const { email, password } = req.body;
    let user = await User.findOne({
        where: {
            email
        }
    });
    if (!user || !await bcrypt.compare(password, passwordDigest)) {
        req.status(403).json({
            message: 'Could not log in the submitted information'
        })
    } else {
        res.status(200).json({ user });
    }
    const data = await response.json();
    console.log(data)
});

module.exports = router