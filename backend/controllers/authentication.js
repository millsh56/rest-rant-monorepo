const router = require("express").Router();
const { response } = require("express");
const db = require("../models");
const bcrypt = require("bcrypt");

const { User } = db;

router.post("/", async (req, res) => {
  console.log("IN HERE");
  const { email, password } = req.body;
  let user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user || !(await bcrypt.compare(password, user.passwordDigest))) {
    req.status(403).json({
      message: "Could not log in the submitted information",
    });
  } else {
    req.session.userId = user.userId
    res.json({user})
  }
  const data = await response.json();
  console.log(data);
});


router.get('/profile', async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        userId: req.session.userId,
      },
    });
    res.json(user);
  } catch (e) {
    res.json(null);
  }
});

module.exports = router;
