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



// const User = require("../models/user-model");
// const bcrypt = require("bcryptjs")


// //? Home controller
// const home = (req, res) => {
//     try {
//         res.status(200).send("hi guys");
//     } catch (error) {
//         console.error(error);  // Log the error for debugging
//         res.status(500).send({ msg: "Internal Server Error" });
//     }
// };

// //? Register controller
// const register = async (req, res) => {
//     try {
//         console.log(req.body);
//         const { username, email, phone, password } = req.body;  // Corrected from res.body

//         // Basic input validation
//         if (!username || !email || !phone || !password) {
//             return res.status(400).json({ msg: "All fields are required" });
//         }

//         //*hash the password
//         // const saltRound = 10;
//         // const hash_password = await bcrypt.hash(password, 10)

//         const userExist = await User.findOne({ email: email });
//         if (userExist) {
//             return res.status(400).json({ msg: "Email already exists" });
//         }

//         const userCreated = await User.create({ username, email, phone, password });
//         res.status(201).json({ 
//             message: "User created successfully",
//             user: userCreated,
//             token: await userCreated.generateToken(),
//             userId: userCreated._id.toString(),
//              });  // Changed to 201
//     } catch (error) {
//         console.error(error);  // Log the error for debugging
//         res.status(500).send({ msg: "Internal Server Error" });  // Changed to 500 for server errors
//     }
// };


// //? User login logic

// const login = async (req, res) => {
//     try {
//         const {email, password } = req.body;

//         const userExist = await User.findOne({email});
//         console.log(userExist);

//         if(!userExist) {
//             return res.status(400).json({ message: "Invalid Credentials"});
//         }

//         // const user = await bcrypt.compare(password, userExist.password);    //!converting it into a function
//         const user = await userExist.comparePassword(password);

//         if(user){
//             res.status(201).json({ 
//                 message: "Login Successful",
//                 token: await userExist.generateToken(),
//                 userId: userExist._id.toString(),
//             });
//         } else {
//             res.status(401).json({message: "Invalid email or password"})
//         }
//     } catch (error) {
//         res.status(500).send({ msg: "Internal Server Error" });
//     }
// };






// module.exports = { home, register, login };




















const User = require("../models/user-model")
const bcrypt = require("bcryptjs");

// *-------------------
// Home Logic
// *-------------------
const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.log(error);
  }
};

// *-------------------------------
//* User Registration Logic 📝
// *-------------------------------
// 1. Get Registration Data: 📤 Retrieve user data (username, email, password).
// 2. Check Email Existence: 📋 Check if the email is already registered.
// 3. Hash Password: 🔒 Securely hash the password.
// 4. Create User: 📝 Create a new user with hashed password.
// 5. Save to DB: 💾 Save user data to the database.
// 6. Respond: ✅ Respond with "Registration Successful" or handle errors.




const register = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { firstName, lastName, email, phone, password } = req.body;


        if (!password) {
          console.error("Password is missing in the request");
          return res.status(400).json({ msg: "Password is required" });
        }
        // Validate request (consider using a schema validator here)

        // Check for existing user
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Create new user
        const userCreated = await User.create({ 
            firstName,
            lastName,
            email,
            phone,
            password, // Password will be hashed in the pre-save hook
        });
        res.status(201).json({
            msg: "Registration Successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        console.error("Error while registering user:", error);
        res.status(500).json({ message: "Internal fuck server error" });
    }
};

  
  

// *-------------------------------
//* User Login Logic 📝
// *-------------------------------

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // const user = await bcrypt.compare(password, userExist.password);
    const isPasswordValid = await userExist.comparePassword(password);

    if (isPasswordValid) {
      res.status(200).json({
        message: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password " });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { home, register, login };










//? In most cases, converting _id to a string is a good practice because it ensures consistency and compatibility across different HWT  libraries and systems. It also aligns with the expectation that claims in JWT  are represented as string.













































// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if user exists
//         const userExist = await User.findOne({ email });
//         if (!userExist) {
//             return res.status(400).json({ message: "Invalid Credentials" });
//         }

//         // Check if the password matches
//         const isPasswordMatch = await bcrypt.compare(password, userExist.password);

//         if (isPasswordMatch) {
//             // Generate token
//             const token = await userExist.generateToken();
            
//             res.status(200).json({
//                 message: "Login Successful",
//                 token,
//                 userId: userExist._id.toString(),
//             });
//         } else {
//             res.status(401).json({ message: "Invalid email or password" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };