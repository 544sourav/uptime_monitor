import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const generateIncidentSummary = async (
  monitorName: string,
  url: string,
  errorDetail: string,
  pastIncidentCount: number,
) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `A monitoring system detected "${monitorName}" (${url}) is down.
        Failure reason: ${errorDetail}.
        This service has had ${pastIncidentCount} prior recorded incidents.

        Write a 2-3 sentence incident note for a status page. Base it only on the failure reason given. If prior incidents exist, note briefly that this isn't the first occurrence. Do not invent a root cause beyond what's stated.`;

    const result = await model.generateContent(prompt);
    // console.log("result", result);
    return result.response.text();
  } catch (err) {
    console.log("Failed to generate AI summary:", err);
    return "Ai summary  unavailable";
  }
};