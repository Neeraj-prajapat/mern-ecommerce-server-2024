const {z} = require("zod");


//Creating an object schema

const signupSchema = z.object({
    username: z
        .string({required_error: "Name is required"})
        .trim()
        .min(3, { message: "Name must be at least of 3 charters."})
        .min(3, { message: "Name must not be more than 255 charters."}),
    email : z
        .string({ required_error_ : "Emial is required"})    
        .trim()
        .email({ message: "Invalid email address"})
        .min( 3, { message: "Email must must not be at least of 3 characters" })
        .max(255, { message: "email must not be more than 255 characters"}),
    phone: z 
        .string({ required_error: "Phone is required "})
        .trim()
        .min(10, { message: "Phone must be at least of 10 characters"})
        .max(1024, "Password can't be greater than 1024 characters")
})

module.exports = signupSchema
