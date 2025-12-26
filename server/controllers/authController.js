const User = require("../models/user");

exports.login = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name required" });

  try {
    let user = await User.findOne({ name });
    if (!user) {
      user = await User.create({ name });
    }
    return res.json({ id: user._id.toString(), name: user.name, avatar: user.avatar || null });
  } catch (err) {
    console.error("login error", err);
    return res.status(500).json({ error: "login_failed" });
  }
};
