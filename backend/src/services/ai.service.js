const  { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});



async function generateTags(prompt="how to become mern stack developer") {
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Generate a concise list of 5 most relevant tags for the following topic.
Return ONLY a valid JSON array of strings with no explanation.
Topic: "${prompt}"`,
  });
  try {
     // Get the text output from Gemini
    let output = response.text;

    // Remove markdown code fences if present
    output = output.replace(/```json|```/g, "").trim();

    // Parse cleaned JSON
    const tags = JSON.parse(output);
    return tags;
    
  } catch (error) {
    return [];
    console.error("Error parsing JSON:", error);
  }
}

module.exports = {
    generateTags
};