const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { users } = require("./db");
const bcrypt = require("bcrypt");

router.post(
  "/signup",
  [
    check("email", "Please enter a valide email").isEmail(),
    check(
      "password",
      "Please passe a value that's greather than 10 carachters"
    ).isLength({ min: 10 })
  ],
  async (req, res) => {
    const { password, email } = req.body;

    //Validate the input
    const errors = validationResult(req); // Return Array of errors if any
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    //Validate if the email user already exist in the DB before the creation on the database
    let user = users.find(user => user.email === email);
    if (user) {
      return res.status(400).json({ error: "User already exist" });
    }

    let hashPassword = await bcrypt.hash(password, 10);
    users.push({
      email, //ici le key et la valeur sont "email"
      password: hashPassword
    });
    console.log(hashPassword);

    res.send("Validation Passed!");
  }
);

router.get("/all", (req, res, next) => {
  res.status(200).json({ users });
});

module.exports = router;
