const validate = (schema) => async (req, res, next) => {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      return next();
    } catch (err) {
      const status = 422;
      const message = "Fill the input properly";
      const extraDetails = err.issues.map((curElem) => curElem.message);
  
      const error = {
        status,
        message,
        extraDetails,
      };
  
      next(extraDetails);
    }
  };
  
  module.exports = validate;






// const validate = (Schema) => async (req, res, next) => {
//     try {
//         // Validate the request body
//         const parsedBody = await Schema.parseAsync(req.body);
//         req.body = parsedBody;
//         next(); // Proceed to the next middleware or route handler
//     } catch (err) {
//         // Create the validation error object to pass to the errorMiddleware
//         const error = {
//             status: 400,  // Use standard Bad Request status code
//             message: "Validation failed. Please fill the input correctly.",
//             extraDetails: err.errors.map((error) => ({
//                 field: error.path.join('.'),  // The field where the error occurred
//                 message: error.message        // The error message
//             }))
//         };

//         next(error);  // Pass the error to the error middleware
//     }
// };

// module.exports = validate;
