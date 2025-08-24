const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const Agent = require("../models/Agent");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  const ext = req.file.originalname.split(".").pop();

  if (!["csv", "xlsx", "xls"].includes(ext)) {
    return res.status(400).json({ msg: "Invalid file format" });
  }

  const results = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        const agents = await Agent.find();
        if (agents.length < 5) {
          return res.status(400).json({ msg: "Need at least 5 agents" });
        }

        const totalTasks = results.length;

        if (totalTasks % 5 === 0) {
          const tasksPerAgent = totalTasks / 5;

          for (let a = 0; a < 5; a++) {
            const agent = agents[a];
            const start = a * tasksPerAgent;
            const end = start + tasksPerAgent;

            for (let i = start; i < end; i++) {
              const task = new Task({
                firstName: results[i].FirstName,
                phone: results[i].Phone,
                notes: results[i].Notes,
                assignedTo: agent._id,
              });
              await task.save();
            }
          }
        }

        else {
          let agentCount = 5;
          for (let i = 0; i < totalTasks; i++) {
            const agent = agents[i % agentCount];

            const task = new Task({
              firstName: results[i].FirstName,
              phone: results[i].Phone,
              notes: results[i].Notes,
              assignedTo: agent._id,
            });

            await task.save();
          }
        }

        res.json({ msg: "Tasks distributed successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
      }
    });
});


module.exports = router;
