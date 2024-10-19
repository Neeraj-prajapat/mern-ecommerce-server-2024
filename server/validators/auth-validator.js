const {z} = require("zod");


//Creating an object schema

const signupSchema = z.object({
    username: z
        .string({required_error: "Name is required"})
        .trim()
        .min(3, { message: "Name must be at least 3 characters."})
        .max(255, { message: "Name must not be more than 255 characters."}),

    email : z
        .string({ required_error: "Email is required"})    
        .trim()
        .email({ message: "Invalid email address"})
        .min( 3, { message: "Email must must not be at least of 3 characters" })
        .max(255, { message: "email must not be more than 255 characters"}),
 phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least 10 characters" })
    .max(15, { message: "Phone must not exceed 15 characters" }), // Adjust the max limit if needed

})

module.exports = signupSchema
