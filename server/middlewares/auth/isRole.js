//Role Guard

//higer order function HOF
module.exports = (...roles) => {
    //console.log(roles)
  return (req, res, next) => {
    console.log(req.user)
    if (!roles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "You don't have permission to access this endpoint" });
    }
    next();
  };
};
