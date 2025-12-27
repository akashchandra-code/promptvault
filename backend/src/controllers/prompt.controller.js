const promptModel = require('../models/prompt.model');
const aiService = require('../services/ai.service');

async function createPrompt(req, res) {
    const { title, description, category, type } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }
    const ownerId = req.user.id;
    try {
        const tags = await aiService.generateTags(description);
        console.log("Tags in controller:", tags);
        const newPrompt = new promptModel({
            title,
            description,
            category,
            type,
            tags,
            ownerId
        });
        await newPrompt.save();
        res.status(201).json(newPrompt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    
    }
}

async function getAllPrompts(req, res) {
    try {
        const prompts = await promptModel.find({ type: 'public' });
        res.status(200).json(prompts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getMyPrompts(req, res) {
    const ownerId = req.user.id;
    try {
        const prompts = await promptModel.find({ ownerId });
        res.status(200).json(prompts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getPromptById(req, res) {
    const promptId = req.params.id;
    const ownerId = req.user.id;    
    try {
        const prompt = await promptModel.findById(promptId);    
        if (!prompt) {
            return res.status(404).json({ error: 'Prompt not found' });
        }   
        if (prompt.type === 'private' && prompt.ownerId.toString() !== ownerId) {
            return res.status(403).json({ error: 'Access denied' });
        }   
        res.status(200).json(prompt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updatePrompt(req, res) {
    const promptId = req.params.id;
    const ownerId = req.user.id;
    const { title, description, category, type } = req.body;
    try {
        
        const prompt = await promptModel.findById(promptId);
        if (!prompt) {
            return res.status(404).json({ error: 'Prompt not found' });
        }
        if (prompt.ownerId.toString() !== ownerId) {
            return res.status(403).json({ error: 'Access denied' });
        }
        prompt.title = title || prompt.title;   
        prompt.description = description || prompt.description;
        prompt.category = category || prompt.category;

        prompt.type = type || prompt.type;
        prompt.updatedAt = Date.now();
        await prompt.save();
        res.status(200).json(prompt);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deletePrompt(req, res) {
    const promptId = req.params.id;
    const ownerId = req.user.id;
    try {
        const prompt = await promptModel.findById(promptId);
        if (!prompt) {
            return res.status(404).json({ error: 'Prompt not found' });
        }
        if (prompt.ownerId.toString() !== ownerId) {
            return res.status(403).json({ error: 'Access denied' });
        }
        await promptModel.findByIdAndDelete(promptId);
        res.status(200).json({ message: 'Prompt deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createPrompt,
    getAllPrompts,
    getMyPrompts,
    getPromptById,
    updatePrompt,
    deletePrompt
};