const jwt = require("jsonwebtoken");

exports.gernerateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "2d",
  });

  // const cookieOptions = {
  //   http: true,
  //   secure: true,
  // };

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',  // or 'lax'
    maxAge: 48 * 60 * 60 * 1000, // match token expiration if possible (2 days)
  };
  

  return { token, cookieOptions };
};
