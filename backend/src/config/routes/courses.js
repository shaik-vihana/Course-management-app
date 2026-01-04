const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* GET ALL */
router.get("/courses", auth, (req, res) => {
  db.all("SELECT * FROM courses", [], (err, rows) => {
    res.json(rows);
  });
});

/* GET ONE */
router.get("/course/:id", auth, (req, res) => {
  db.get(
    "SELECT * FROM courses WHERE id = ?",
    [req.params.id],
    (err, row) => {
      res.json(row);
    }
  );
});

/* CREATE */
router.post("/courses", auth, (req, res) => {
  const { course_name, description, instructor } = req.body;

  db.run(
    "INSERT INTO courses (course_name, description, instructor) VALUES (?, ?, ?)",
    [course_name, description, instructor],
    () => res.json({ message: "Course added" })
  );
});

/* UPDATE */
router.put("/course/:id", auth, (req, res) => {
  const { course_name, description, instructor } = req.body;

  db.run(
    "UPDATE courses SET course_name=?, description=?, instructor=? WHERE id=?",
    [course_name, description, instructor, req.params.id],
    () => res.json({ message: "Course updated" })
  );
});

/* DELETE */
router.delete("/course/:id", auth, (req, res) => {
  db.run(
    "DELETE FROM courses WHERE id = ?",
    [req.params.id],
    () => res.json({ message: "Course deleted" })
  );
});

module.exports = router;
