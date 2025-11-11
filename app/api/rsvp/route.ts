import { capitalizeWords } from '@/app/helpers/capitalize';
import { google } from 'googleapis';
import { Resend } from 'resend';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendConfirmationEmail(data: any) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (!data.contactInfo?.email) return;

  const { email } = data.contactInfo;
  const { attending, plusOne, plusOneFirst, plusOneLast, party, notAttending } = data;

  // Determine attending guests (exclude notAttending)
  const attendingGuests = party.filter((guest: string) => !notAttending.includes(guest));
  if (plusOne && plusOneFirst && plusOneLast) {
    attendingGuests.push(`${plusOneFirst} ${plusOneLast}`);
  }

  let emailHtml = `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); padding: 30px;">
      <h2 style="color: #e91e63; text-align: center; margin-top: 0;">${attending ? 'Your RSVP is Confirmed!' : 'We’ll Miss You!'}</h2>
`;

  if (attending) {
    emailHtml += `
      <p style="font-size: 16px;">Thank you for confirming your attendance! Here are your RSVP details:</p>
      <ul style="font-size: 16px; padding-left: 20px;">
        <li><strong>Attending:</strong> Yes</li>
        <li><strong>Guests:</strong> ${attendingGuests.length > 0 ? capitalizeWords(attendingGuests.join(', ')) : 'None'}</li>
      </ul>
      <p style="font-size: 16px;"><strong>Wedding Details:</strong></p>
      <ul style="font-size: 16px; padding-left: 20px;">
        <li><strong>Date:</strong> March 20, 2026</li>
        <li><strong>Time:</strong> 5:00 PM</li>
        <li><strong>Location:</strong> 802 Mateo St, Los Angeles, CA 90021</li>
        <li><strong>Reception:</strong> Immediately following the ceremony</li>
      </ul>
      <p style="font-size: 16px;">We look forward to celebrating with you!</p>
      <p style="text-align: center; margin-top: 30px;">
        <span style="background-color: #e91e63; color: #fff; padding: 10px 20px; border-radius: 5px;">See You Soon!</span>
      </p>
  `;
  } else {
    emailHtml += `
      <p style="font-size: 16px;">We’re sorry you won’t be able to join us. Your RSVP has been recorded as:</p>
      <ul style="font-size: 16px; padding-left: 20px;">
        <li><strong>Attending:</strong> No</li>
        <li><strong>Guests Not Attending:</strong> ${notAttending.length > 0 ? capitalizeWords(notAttending.join(', ')) : 'None'}</li>
      </ul>
      <p style="font-size: 16px;">Thank you for letting us know!</p>
      <p style="text-align: center; margin-top: 30px;">
        <span style="background-color: #9e9e9e; color: #fff; padding: 10px 20px; border-radius: 5px;">We’ll Miss You!</span>
      </p>
  `;
  }

  emailHtml += `
      <p style="font-size: 12px; color: #999; text-align: center; margin-top: 40px;">
        &copy; ${new Date().getFullYear()} Brian & Mio Wedding. All rights reserved.
      </p>
    </div>
  </div>
`;

  try {
    await resend.emails.send({
      from: 'rsvp@mioandbrian.love',
      to: email,
      subject: 'RSVP Confirmation – Mio & Brian Wedding, March 20, 2026',
      html: emailHtml,
    });
    console.log(`RSVP confirmation email sent to ${email}`);
  } catch (err) {
    console.error(`Failed to send RSVP email to ${email}:`, err);
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const {
    rowIndex,
    attending,
    plusOne,
    plusOneFirst,
    plusOneLast,
    contactInfo, // new object: { email, address, city, state, zip, message }
    notAttending,
    message,
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
    requests.push(
      sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Sheet1!Q${rowIndex}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [[message || '']] },
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

      const columns: Record<string, string | undefined> = {
        K: email,
        L: addressLine,
        M: city,
        N: state,
        O: zip,
      };

      for (const [col, value] of Object.entries(columns)) {
        requests.push(
          sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `Sheet1!${col}${rowIndex}`,
            valueInputOption: 'USER_ENTERED',
            requestBody: { values: [[value || '']] },
          })
        );
      }
    }

    await Promise.all(requests);

    await sendConfirmationEmail(body);

    return Response.json({ message: 'RSVP updated successfully' });
  } catch (err) {
    console.error('Error updating sheet:', err);
    return new Response('Failed to update sheet', { status: 500 });
  }
}
