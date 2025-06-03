 const jwt = require('jsonwebtoken')

const authUser = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    //console.log(" Decoded Token:", decodedToken);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.log(" JWT Verify Error:", error.message); 
    return res.status(401).json({ message: "Invalid token" });
  }
};


module.exports = authUser;
  