import dotenv from "dotenv";
dotenv.config();

import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI,
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

export const sendDownAlert = async (
  monitorName: string,
  url: string,
  failures: number,
  toEmail: string,
) => {
  try {
    const gmail = google.gmail({
      version: "v1",
      auth: oauth2Client,
    });
    // console.log("email : ",toEmail);
    
    const messageParts = [
      `To: ${toEmail}`,
      `Subject: ${monitorName} is DOWN`,
      "Content-Type: text/html; charset=UTF-8",
      "",
      `
      <h2>Website Down Alert</h2>
      <p><b>${monitorName}</b></p>
      <p>URL: ${url}</p>
      <p>Failed Checks: ${failures}</p>
      <p style="color:red;"><b>Status: DOWN</b></p>
      `,
    ];

    const message = messageParts.join("\n");

    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    // console.log("Email sent:", response.data.id);

    return response.data;
  } catch (err) {
    console.error("Gmail API send error:", err);
  }
};
