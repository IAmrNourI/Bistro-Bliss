const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
  // const token =
  //   req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  // if (!token) return res.status(401).json({ message: "invalid token" });
  const authHeader = req.headers["authorization"];
  const token = req.cookies.token || (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);
  
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    // console.log(req.user);
    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message,
      error: true,
    });
  }
};
