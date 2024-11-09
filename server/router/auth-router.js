const express = require("express");
const router = express.Router();
const { home, register, login, user } = require("../controllers/auth-controller");
const signupSchema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require('../middlewares/auth-middleware');

router.route("/").get(home);
router.route("/register").post(validate(signupSchema), register);
router.route("/login").post(login);

router.route("/user").get(authMiddleware, user);




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




