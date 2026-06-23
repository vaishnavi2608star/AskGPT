import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse  from "../utils/openai.js";

const router = express.Router();

router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadID: "xyz",
      title: "test",
    });

    const response = await thread.save();

    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error creating thread",
    });
  }
});
// get all threads
router.get("/threads", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  }catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching threads",
    });
  }
});
router.get("/threads/:threadID", async (req, res) => {
  try {
    let thread = await Thread.findOne({ threadID: req.params.threadID });
    if(!thread){
      return res.status(404).json({error: "Thread not found"});
    }
    res.json(thread.messages);
  }catch (err) {
    console.log(err);
    res.status(500).json({error: "Error fetching thread"});
  }
});

//delete route
router.delete("/threads/:threadID", async (req, res) => {
    const {threadID} = req.params;
  try {
  
    const deletedThread = await Thread.findOneAndDelete({ threadID: req.params.threadID });
    if(!deletedThread){
      return res.status(404).json({error: "Thread not found"});
    }
    res.json({message: "Thread deleted successfully"});
  }catch (err) {
    console.log(err);
    res.status(500).json({error: "Error deleting thread"});
  }
});
router.post("/chat", async (req, res) => {
  try {
    const { threadID, message } = req.body || {};

    if (!threadID || !message) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    // 1. Get or create thread (SAFE)
    let thread = await Thread.findOne({ threadID });

    if (!thread) {
      thread = await Thread.create({
        threadID,
        title: message,
        messages: [],
      });
    }

    // 2. Add user message
    thread.messages.push({
      role: "user",
      content: message,
    });

    // 3. AI response
    const assistReply = await getOpenAIAPIResponse(message);

    // 4. Add assistant message
    thread.messages.push({
      role: "assistant",
      content: assistReply,
    });

    // 5. Save ONCE (IMPORTANT FIX)
    await thread.save();

    return res.json({
      reply: assistReply,
      threadID,
    });
  } catch (err) {
    console.log("CHAT ERROR:", err);
    return res.status(500).json({
      error: err.message,
    });
  }
});
export default router;