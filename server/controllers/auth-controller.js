// *_________________ Controllers in Node.js = Dispatch in React

//? In an Express.js application, a "controller" refers to a part of your code that is responsible for handling the application's logic. Controllers are typically used to process incoming request, interact with models (data Sources), and send responses back to clients. They help organize your application by separating concerns and following th MVC (Model-View-Controller) design pattern.


// const User = require("../models/user-model")
// // Home controller
// const home = (req, res) => {
//     try {
//         res.status(200).send("hi guys");
//     } catch (error) {
//         console.error(error);  // Log the error for debugging
//         res.status(500).send({ msg: "Internal Server Error" });
//     }
// };

// // Register controller
// const register = async (req, res) => {
//     try {
//         console.log(req.body)
//         const {username, email, phone, password} = res.body;

//         const userExist = await User.findOne({email: email});
//         if(userExist){
//             return res.status(400).json({msg: "email already exists"})
//         }
//         const userCreated = await User.create({username, email, phone, password});


//         res.status(200).json({message: userCreated});
//     } catch (error) {
//         console.error(error);  // Log the error for debugging
//         res.status(400).send({ msg: "Page not found" });
//     }
// };

// module.exports = { home, register };



const User = require("../models/user-model");
// const bcrypt = require("bcrypt")


// Home controller
const home = (req, res) => {
    try {
        res.status(200).send("hi guys");
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

// Register controller
const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;  // Corrected from res.body

        // Basic input validation
        if (!username || !email || !phone || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        //*hash the password
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, 10)

        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const userCreated = await User.create({ username, email, phone, password });
        res.status(201).json({ 
            message: "User created successfully",
            user: userCreated,
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
             });  // Changed to 201
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).send({ msg: "Internal Server Error" });  // Changed to 500 for server errors
    }
};

module.exports = { home, register };






//? In most cses, converting _id to a string is a good practice because it ensures consistency and compatibility across different HWT  libraries and systems. It also aligns with the expectation that claims in JWT  are represented as string.