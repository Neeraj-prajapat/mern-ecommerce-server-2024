const Contact = require("../models/contact-model");

const contactForm = async (req, res, next) => {
    try {
        const { firstName, lastName, email, message } = req.body;
        
        // Creating the new contact
        const contact = new Contact({
            firstName,
            lastName,
            email,
            message,
        });

        // Save the contact form details to the database
        await contact.save();
        
        return res.status(201).json({ message: "Message delivered" });
    } catch (error) {
        next(error); // Passes the error to the middleware
    }
};

module.exports = contactForm;




