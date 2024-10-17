require("dotenv").config()
const express = require("express");
const app = express();
const router =require("./router/auth-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");


app.use(express.json());

//? Mount the Router: To use the in your main Express app, you can " mount" it at a specific URL prefix
app.use("/api/auth", router);
app.use(errorMiddleware);

// app.get("/", (req, res) => {         //? ye part router folder ke aander likh diya gya hai to make server page clean and easy to learn
//     res.status(200).send("hi guys")
// });


const PORT = 8000;

connectDB().then( () => {
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    });
});




// const startServer = async () => {
//     try {
//         // Connect to the database
//         await connectDB();
//         console.log("Successfully connected to the database");

//         // Start the server after successful DB connection
//         app.listen(PORT, () => {
//             console.log(`Server is running at port: ${PORT}`);
//         });
//     } catch (err) {
//         // Handle any database connection errors
//         console.error("Database connection failed:", err.message);
//         process.exit(1); // Exit the process with failure
//     }
// };

// // Start the server
// startServer();