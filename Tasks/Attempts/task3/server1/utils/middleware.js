// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
const secretKey = 'my-secret-key'; // Replace with your secret key

function authenticateToken(req, res, next) {
  // Get the token from the request headers
  let token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    // return res.status(401).json({ message: 'Unauthorized: No token provided' });
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ message: 'Unauthorized: No token provided' })
    );
  } else {

  // Verify the token
  jwt.verify(token, secretKey, (err, decodedUser) => {
    if (err) {
    //   return res.status(403).json({ message: 'Forbidden: Invalid token' });
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ message: 'Forbidden: Invalid token' })
    );
    console.log("YOUR TOKEN IS NOT VALID");
    } else {
        // User details are available in the 'decoded' object
    // req.userId = decoded.userId;
    // req.userRole = decoded.userRole;
    // req.userEmail = decoded.userEmail;
    req.user = decodedUser
    console.log("user", req.user);
    next();
    }

  });
}
}

const returnError = (req, res, statusCode, title, message) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      title: title,
      message: message,
    })
  );
};

export default {authenticateToken, returnError}