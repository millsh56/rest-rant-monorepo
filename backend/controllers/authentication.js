const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("json-web-token");


const { User } = db;

router.post("/", async (req, res) => {
  console.log("IN HERE");
  const { email, password } = req.body;
  console.log(email, password)
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
    const result = await jwt.encode(process.env.JWT_SECRET, {
      userId: user.userId,
    });
    res.json({ user: user, token: result.value });
  }
});

router.get("/profile", async (req, res) => {
  res.json(req.currentUser)
});

module.exports = router;
