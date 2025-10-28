'use client';

import React from 'react';
import { capitalizeWords } from './helpers/capitalize';

interface RsvpPayload {
  rowIndex: number;
  attending: boolean;
  plusOneFirst?: string;
  plusOneLast?: string;
}

export default function Home() {
  const [name, setName] = React.useState('');
  const [nameAvailable, setNameAvailable] = React.useState<boolean | null>(null);
  const [party, setParty] = React.useState<string[]>([]);
  const [rowIndex, setRowIndex] = React.useState<number | null>(null);

  const [attending, setAttending] = React.useState<boolean | null>(null);
  const [plusOne, setPlusOne] = React.useState<boolean | null>(null);
  const [bringingPlusOne, setBringingPlusOne] = React.useState(false);
  const [plusOneFirst, setPlusOneFirst] = React.useState('');
  const [plusOneLast, setPlusOneLast] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  async function fetchGuest() {
    if (!name) return;
    setLoading(true);
    try {
      const res = await fetch('/api/check-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      setNameAvailable(data.available);
      setParty(data.party || []);
      setRowIndex(data.row || null);
      setPlusOne(data.plus_one || null);

      if (!data.available) {
        alert('Name not found in guest list.');
      }
    } catch (err) {
      console.error(err);
      alert('Error checking name.');
    } finally {
      setLoading(false);
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

    setSubmitting(true);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('RSVP submitted successfully!');
      } else {
        alert('Something went wrong, please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit RSVP.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-10 sm:items-start">
        <h1 className="text-xl font-semibold mb-4">Mio & Brian&apos;s Wedding RSVP</h1>

        {/* Name input + check button */}
        <div className="flex w-full max-w-md">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="mt-4 mr-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
          <button
            onClick={fetchGuest}
            disabled={!name || loading}
            className={`mt-4 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            )}
            {loading ? 'Checking...' : 'Check Name'}
          </button>
        </div>

        {/* Party list */}
        {party.length > 1 && (
          <div className="mt-4 text-gray-700 dark:text-gray-300">
            Guests: {party.map((name) => capitalizeWords(name)).join(', ')}
          </div>
        )}

        {/* RSVP options */}
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
                  placeholder="First Name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                />
                <input
                  type="text"
                  value={plusOneLast}
                  onChange={(e) => setPlusOneLast(e.target.value)}
                  placeholder="Last Name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                />
              </div>
            )}
          </div>
        )}

        {/* Submit button with spinner */}
        <button
          disabled={!nameAvailable || attending === null || submitting}
          onClick={handleSubmit}
          className={`mt-6 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
            submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {submitting && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
          )}
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </main>
    </div>
  );
}
