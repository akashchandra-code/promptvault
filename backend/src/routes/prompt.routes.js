const express = require("express");
const router = express.Router();
const promptController = require("../controllers/prompt.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, promptController.createPrompt);

router.get("/", promptController.getAllPrompts);

router.get("/my-prompts", authMiddleware, promptController.getMyPrompts);

router.get("/:id", authMiddleware, promptController.getPromptById);

router.patch("/:id", authMiddleware, promptController.updatePrompt);

router.delete("/:id",authMiddleware, promptController.deletePrompt);

module.exports = router;