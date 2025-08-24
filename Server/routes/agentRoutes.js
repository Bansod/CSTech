const express = require("express");
const bcrypt = require("bcryptjs");
const Agent = require("../models/Agent");
const Task = require("../models/Task")
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    let existing = await Agent.findOne({ email, user: req.user.id });
    if (existing) return res.status(400).json({ msg: "Agent already exists for this user" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const agent = new Agent({
      name,
      email,
      mobile,
      password: hashedPassword,
      user: req.user.id
    });

    await agent.save();
    res.json(agent);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get("/:agentId/tasks", authMiddleware, async (req, res) => {
  const { agentId } = req.params;

  try {
    const agent = await Agent.findOne({ _id: agentId, user: req.user.id });
    if (!agent) return res.status(404).json({ msg: "Agent not found" });

    const tasks = await Task.find({ assignedTo: agentId }).lean();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const agents = await Agent.find({ user: req.user.id })
      .lean()
      .select("-password -__v");
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
