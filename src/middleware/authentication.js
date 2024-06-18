const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "Invalid token" });
    }
    if (token) {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      next();
    }

  } catch (err) {
    res.status(401).json({ message: "Authorization error" });
  }
};

const loginToken = (user) => {
  let token = jwt.sign(
    { id: user?._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

module.exports = { authentication, loginToken };
