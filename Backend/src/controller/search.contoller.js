import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/ayncHandler.js"
import { Course } from "../model/course.model.js"
import { GoogleGenAI } from "@google/genai";

const searchWithAi = asyncHandler(async (req, res) => {
    const { input } = req.body

    if (!input) {
        throw new ApiError(400, "Search query Required")
    }

    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

    const prompt = `
You are an AI course recommendation assistant for an LMS platform.

Your job is to understand the user's learning request and map it into structured course search parameters.

The LMS has these course fields:

Category examples:
- Web Development
- Mobile Development
- Data Science
- AI & ML
- AI Tools
- Cyber Security
- UI/UX Design
- Data Analytics
- Other

Level examples:
- Beginner
- Intermediate
- Advanced


Analyze the user's query and extract:

1. category:
Choose the most relevant LMS category.
If multiple categories apply, return the best one.


2. level:
Determine the user's skill level.

Rules:
- "starting", "new", "zero knowledge", "from scratch" → Beginner
- "already know basics", "improve skills", "build projects" → Intermediate
- "expert", "advanced", "professional", "deep dive" → Advanced
- If unclear → Beginner


3. keywords:
Extract important technology/topic keywords useful for searching courses.


4. intent:
Understand what the user wants:
- learn
- build project
- improve skills
- career/job preparation
- certification


Return ONLY valid JSON.


Example:

User:
"I want to learn React and build modern websites"

Response:

{
 "category":"Web Development",
 "level":"Beginner",
 "keywords":[
    "React",
    "Frontend",
    "JavaScript",
    "Web Development"
 ],
 "intent":"learn"
}


User:
"I am a MERN developer and want advanced backend skills"

Response:

{
 "category":"Web Development",
 "level":"Advanced",
 "keywords":[
    "MERN",
    "Node.js",
    "Backend",
    "API"
 ],
 "intent":"improve skills"
}


User Query:

${input}
`;

    const interaction = await ai.interactions.create({
        model: "gemini-3-flash-preview",
        input: prompt,
    });

    const { category, level, keywords, intent } = JSON.parse(interaction.output_text);




    const course = await Course.find({
        isPublished: true,
        $or: [
            { title: { $regex: keywords.join('|'), $options: 'i' } },
            { subtitle: { $regex: keywords.join('|'), $options: 'i' } },
            { description: { $regex: keywords.join('|'), $options: 'i' } },
            { category: { $regex: category, $options: 'i' } },
            { level: { $regex: level, $options: 'i' } }
        ]
    }).populate("reviews")

    return res.status(200).json(
        new ApiResponse(200, course , "Course found successfully")
    )
})


export {
    searchWithAi
}