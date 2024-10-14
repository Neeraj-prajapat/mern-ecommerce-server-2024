const express = require("express");
const router = express.Router();
const { home, register } = require("../controllers/auth-controller");

router.route("/").get(home);
router.route("/register").post(register);




// router.get("/", (req, res) => {
//     res.status(200).send("hi guys")
// });

// router.get("/register", (req, res) => {
//     res.status(200).send("Welcome to register page")
// });



//? you can also write above part like this 
// router.route('/').get((req, res) => {
//     res.status(200).send("fuck you guys")
// })   

module.exports = router;




