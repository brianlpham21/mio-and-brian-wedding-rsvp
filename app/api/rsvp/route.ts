import { google } from "googleapis";

export async function POST(req: Request) {
  const body = await req.json();
  const { rowIndex, attending, plusOne, plusOneFirst, plusOneLast } = body;

  if (!rowIndex) {
    return new Response("Row index is required", { status: 400 });
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

  try {
    const requests = [];

    // Update attending (column A or adjust as needed)
    const attendingColumn = "A"; // Replace with the correct column if needed
    requests.push(
      sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Sheet1!${attendingColumn}${rowIndex}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[attending ? "Yes" : "No"]] },
      })
    );

    // Update plus_one (column H)
    requests.push(
      sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Sheet1!H${rowIndex}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[plusOne ? "TRUE" : "FALSE"]] },
      })
    );

    // Update plus_one_first (column I)
    requests.push(
      sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Sheet1!I${rowIndex}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[plusOneFirst || ""]] },
      })
    );

    // Update plus_one_last (column J)
    requests.push(
      sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Sheet1!J${rowIndex}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[plusOneLast || ""]] },
      })
    );

    await Promise.all(requests);

    return Response.json({ message: "RSVP updated successfully" });
  } catch (err) {
    console.error("Error updating sheet:", err);
    return new Response("Failed to update sheet", { status: 500 });
  }
}
