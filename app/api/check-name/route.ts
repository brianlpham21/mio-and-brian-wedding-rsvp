import { google } from "googleapis";

export async function POST(req: Request) {
  const body = await req.json();
  const { name } = body;

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

  try {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!B:G", // B-F = party names, G = plus_one
    });

    const rows = result.data.values || [];
    let found = false;
    let partyNames: string[] = [];
    let rowIndex: number | null = null;
    let plusOne: boolean = false;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (row.slice(0, 5).some(cell => cell?.trim().toLowerCase() === name.trim().toLowerCase())) {
        found = true;
        partyNames = row.slice(0, 5).filter(cell => cell?.trim()).map(cell => cell.trim());
        rowIndex = i + 1;

        const plusOneCell = row[5]?.trim().toUpperCase(); // handle TRUE / FALSE from Sheets
        plusOne = plusOneCell === 'TRUE';
        break;
      }
    }

    return Response.json({ available: found, party: partyNames, row: rowIndex, plus_one: plusOne });
  } catch (err) {
    console.error("Error checking sheet:", err);
    return new Response("Failed to check sheet", { status: 500 });
  }
}
