const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { secret, expiresIn } = require("../config/jwt");

const router = express.Router();

/* REGISTER */
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);

  const sql =
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.run(sql, [name, email, hashed], function (err) {
    if (err) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.json({ message: "User registered successfully" });
  });
});

/* LOGIN */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, user) => {
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn,
      });

      res.json({ token });
    }
  );
});

module.exports = router;
