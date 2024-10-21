const { z } = require("zod");

// Creating an object schema
const signupSchema = z.object({
    firstName: z
        .string({ required_error: "FirstName is required" })
        .trim()
        .min(3, { message: "Name must be at least 3 characters." })
        .max(255, { message: "Name must not be more than 255 characters." }),
    lastName: z
        .string({ required_error: "LastName is required" })
        .trim()
        .min(3, { message: "Name must be at least 3 characters." })
        .max(255, { message: "Name must not be more than 255 characters." }),

    email: z
        .string({ required_error: "Email is required" })    
        .trim()
        .email({ message: "Invalid email address" })
        .max(255, { message: "Email must not be more than 255 characters." }), // Removed min as it's generally unnecessary.

    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must be at least 10 characters." }) // Minimum length of phone number.
        .max(15, { message: "Phone must not exceed 15 characters." }), // Adjusted message for consistency.
    
    password: z
        .string({ required_error: "Password is required" })
        .min(7, { message: "Password must be at least of 7 characters" })
        .max(1024, "Password can't be greater than 1024 characters"),
});

module.exports = signupSchema;

