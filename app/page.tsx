'use client';

import React from 'react';

import Hero from './components/hero';
import GuestNameCheck from './components/guestNameCheck';
import AttendingConfirmation from './components/attendingConfirmation';
import PlusOneConfirmation from './components/plusOneConfirmation';
import GuestsDisplay from './components/guestsDisplay';
import Submission from './components/submission';

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
        }),
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
        headers: {
          'Content-Type': 'application/json',
        },
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
        <Hero />

        {/* Name input + check button */}
        <GuestNameCheck name={name} setName={setName} fetchGuest={fetchGuest} loading={loading} />

        {/* Party list */}
        <GuestsDisplay party={party} />

        {/* RSVP options */}
        {nameAvailable && (
          <div className="mt-4 flex flex-col gap-2">
            <AttendingConfirmation attending={attending} setAttending={setAttending} />

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

            <PlusOneConfirmation
              bringingPlusOne={bringingPlusOne}
              plusOneFirst={plusOneFirst}
              setPlusOneFirst={setPlusOneFirst}
              plusOneLast={plusOneLast}
              setPlusOneLast={setPlusOneLast}
            />
          </div>
        )}

        {/* Submit button with spinner */}
        <Submission
          nameAvailable={nameAvailable}
          attending={attending}
          submitting={submitting}
          handleSubmit={handleSubmit}
        />
      </main>
    </div>
  );
}
