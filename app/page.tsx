'use client';

import React from "react";

interface RsvpPayload {
  rowIndex: number;
  attending: boolean;
  plusOneFirst?: string;
  plusOneLast?: string;
}

export default function Home() {
  const [name, setName] = React.useState("");
  const [party, setParty] = React.useState<string[]>([]);
  const [rowIndex, setRowIndex] = React.useState<number | null>(null);
  const [plusOne, setPlusOne] = React.useState<boolean | null>(null);
  const [nameAvailable, setNameAvailable] = React.useState<boolean | null>(null);
  const [attending, setAttending] = React.useState<boolean | null>(null);
  const [bringingPlusOne, setBringingPlusOne] = React.useState(false);
  const [plusOneFirst, setPlusOneFirst] = React.useState("");
  const [plusOneLast, setPlusOneLast] = React.useState("");

  async function fetchGuest() {
    if (!name) return;

    try {
      const res = await fetch("/api/check-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      setNameAvailable(data.available);
      setParty(data.party || []);
      setRowIndex(data.row || null);
      setPlusOne(data.plus_one || null);

      if (data.available) {
        alert(`Found party: ${data.party.join(", ")}`);
      } else {
        alert("Name not found in guest list.");
      }
    } catch (err) {
      console.error(err);
      alert("Error checking name.");
    }
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!rowIndex || attending === null) return;

    const payload: RsvpPayload = {
      rowIndex,
      attending,
    };

    if (bringingPlusOne) {
      payload.plusOneFirst = plusOneFirst;
      payload.plusOneLast = plusOneLast;
    }

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("RSVP submitted successfully!");
      } else {
        alert("Something went wrong, please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit RSVP.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        Mio and Brian&apos;s Wedding RSVP:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="mt-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        />
        <button
          onClick={fetchGuest}
          disabled={name === ''}
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Check Name
        </button>

        {party.length > 0 && (
          <div className="mt-4 text-gray-700 dark:text-gray-300">
            Party Members: {party.join(", ")}
          </div>
        )}

        {nameAvailable && (
          <div className="mt-4 flex flex-col gap-2">
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={attending === true}
                  onChange={() => setAttending(true)}
                  className="mr-1"
                />
                Attending
              </label>
              <label>
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={attending === false}
                  onChange={() => setAttending(false)}
                  className="mr-1"
                />
                Not Attending
              </label>
            </div>

            {attending && plusOne && (
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bringingPlusOne}
                  onChange={(e) => setBringingPlusOne(e.target.checked)}
                  className="w-4 h-4"
                />
                I will be bringing a plus one
              </label>
            )}

            {bringingPlusOne && (
              <div className="flex flex-col gap-2 mt-2">
                <input
                  type="text"
                  value={plusOneFirst}
                  onChange={(e) => setPlusOneFirst(e.target.value)}
                  placeholder="Plus One First Name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                />
                <input
                  type="text"
                  value={plusOneLast}
                  onChange={(e) => setPlusOneLast(e.target.value)}
                  placeholder="Plus One Last Name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                />
              </div>
            )}
          </div>
        )}

        <button
          disabled={!nameAvailable || attending === null}
          onClick={handleSubmit}
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </main>
    </div>
  );
}
