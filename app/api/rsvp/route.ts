import { google } from 'googleapis';

export async function POST(req: Request) {
  const body = await req.json();
  const {
    rowIndex,
    attending,
    plusOne,
    plusOneFirst,
    plusOneLast,
    contactInfo, // new object: { email, address, city, state, zip }
    notAttending,
  } = body;

  if (!rowIndex) {
    return new Response('Row index is required', { status: 400 });
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

  try {
    const requests = [];

    // Attending (column A)
    requests.push(
      sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Sheet1!A${rowIndex}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [[attending ? 'Yes' : 'No']] },
      })
    );

    // Plus One columns
    if (attending) {
      requests.push(
        sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `Sheet1!H${rowIndex}`,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [[plusOne ? 'TRUE' : 'FALSE']] },
        })
      );
      requests.push(
        sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `Sheet1!I${rowIndex}`,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [[plusOneFirst || '']] },
        })
      );
      requests.push(
        sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `Sheet1!J${rowIndex}`,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [[plusOneLast || '']] },
        })
      );
      requests.push(
        sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `Sheet1!P${rowIndex}`,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [[(notAttending || []).join(', ')]] },
        })
      );
    }

    // Contact info columns: K–O
    if (contactInfo) {
      const { email, addressLine, city, state, zip } = contactInfo;
      requests.push(
        sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `Sheet1!K${rowIndex}`,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [[email || '']] },
        })
      );
      requests.push(
        sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `Sheet1!L${rowIndex}`,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [[addressLine || '']] },
        })
      );
      requests.push(
        sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `Sheet1!M${rowIndex}`,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [[city || '']] },
        })
      );
      requests.push(
        sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `Sheet1!N${rowIndex}`,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [[state || '']] },
        })
      );
      requests.push(
        sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `Sheet1!O${rowIndex}`,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [[zip || '']] },
        })
      );
    }

    await Promise.all(requests);

    return Response.json({ message: 'RSVP updated successfully' });
  } catch (err) {
    console.error('Error updating sheet:', err);
    return new Response('Failed to update sheet', { status: 500 });
  }
}
