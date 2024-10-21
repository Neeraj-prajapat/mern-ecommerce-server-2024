const { Schema, model } = require("mongoose");  

const contactSchema = new Schema({
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   email: { type: String, required: true },  
   message: { type: String, required: true },
 }); 

 // create a new collections(Model) 
const Contact = new model("Contact", contactSchema);

module.exports = Contact;  









// const { z } = require('zod');

// const contactSchema = z.object({
//     username: z.string().min(3, "Username is required"),
//     email: z.string().email("Invalid email address"),
//     message: z.string().min(1, "Message cannot be empty"),
// });

// module.exports = Contact;
