import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import User from "../models/User.js";
import { configurePaLM, MODEL_NAME } from "../config/palm-config.js";

export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { message } = req.body;
    try {
        console.log("res.locals:", res.locals); // Add this line for debugging

        if (!res.locals.jwtData || !res.locals.jwtData.id) {
            console.error("JWT data or user ID is missing");
            return res.status(401).json({ message: "Authentication failed" });
        }

        const user = await User.findById(res.locals.jwtData.id);
        
        if (!user) {
            console.error("User not found for ID:", res.locals.jwtData.id);
            return res.status(401).json({ message: "User not found" });
        }

        // Rest of your code remains the same
        const chatHistory = user.chats
            .map(({ role, content }) => `${role}: ${content}`)
            .join("\n");

        const fullPrompt = `${chatHistory}\nuser: ${message}\nassistant:`;

        user.chats.push({
            role: "user",
            content: message,
        });

        const palm = configurePaLM();
        const [result] = await palm.generateText({
            model: MODEL_NAME,
            prompt: { text: fullPrompt },
        });

        if (!result.candidates || result.candidates.length === 0) {
            throw new Error("No response generated");
        }

        const generatedMessage = result.candidates[0].output;

        user.chats.push({
            role: "assistant",
            content: generatedMessage,
        });

        await user.save();

        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.error("Error in generateChatCompletion:", error);
        return res
            .status(500)
            .json({ message: "Something went wrong", error: error.message });
    }
};

export const sendChatsToUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await User.findById(res.locals.jwtData.id);
		if (!user) {
			return res
				.status(401)
				.json({ message: "User not registered OR Token malfunctioned" });
		}
		// Send all chats for this user
		return res.status(200).json({ message: "OK", chats: user.chats });
	} catch (error) {
		console.error("Error in sendChatsToUser:", error);
		return res.status(500).json({ message: "ERROR", cause: error.message });
	}
};

export const deleteChats = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//user token check
		const user = await User.findById(res.locals.jwtData.id);
		if (!user) {
			return res.status(401).send("User not registered OR Token malfunctioned");
		}
		if (user._id.toString() !== res.locals.jwtData.id) {
			return res.status(401).send("Permissions didn't match");
		}
        //@ts-ignore
		user.chats = [];
		await user.save();
		return res.status(200).json({ message: "OK" });
	} catch (error) {
		console.log(error);
		return res.status(200).json({ message: "ERROR", cause: error.message });
	}
};
