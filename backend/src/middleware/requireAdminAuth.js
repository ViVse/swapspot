const requireAdminAuth = (req, res, next) => {
  if (!req.user) {
    res.status(401).send();
  }
  if (req.user.role === "ADMIN") {
    next();
  } else {
    res.status(401).send();
  }
};

export default requireAdminAuth;
