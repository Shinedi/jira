module.exports = (req, res, next) => {
  console.log(456);
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "body" && req.body.password === "123456") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      console.log(123);
      return res.status(400).json({ message: "用户名或者密码错误" });
    }
  }
  next();
};
