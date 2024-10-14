const mongoose = require("mongoose");
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    username : {
        type: String, 
        require: true, 
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type:Boolean,
        default: false,
    }
});


//? secure the password with the bcrypt
userSchema.pre("save", async function (next) {
    console.log("pre method", this);
        const user = this;

        if(!user.isModified("password")) {
            next();
        }
        try {
            const saltRound = await bcrypt.genSalt(10);
            const hash_password = await bcrypt.hash(user.password, saltRound)
            user.password = hash_password;
        } catch (error){
            next(error);
        }
})


//define the model or the collection name

const User = new mongoose.model("User", userSchema);

module.exports = User


















// **What is JWT? **

// JSON Web Tokens (JWT) is open standard (RFC 7519) that defines a compact and self-constained way for seccurely transmitting information between parties as a JSON object.
// - JWTs are often used for authentication and authorization in web applications.
// 1. ** Authentication:** verifying the identify of a user or client.
// 2. **Authorization: ** Determining what actions a user or clients is allowed to perform


// **Components of a JWT: **

// -Header: Contains metadata about the token, such as the type of token and the signing algorithm being used.
// -Payload: Contains claims or statements about an entity (typically, the user) and additional data. Common claims include usr ID, username, and expiration time.      
// -Signature: Tjo verify that the sender of the JWT is who it says it is and to insure that the message wasn't changed along the way, a signature is included