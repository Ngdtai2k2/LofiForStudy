const createOptions = require("../configs/createOptions");
const User = require("../models/User");

const dashboardController = {
  countUsers: async (req, res) => {
    try {
        const userCount = await User.countDocuments({});
        return res.status(200).json({ total: userCount });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};

module.exports = dashboardController;
