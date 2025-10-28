'use client';

import React from 'react';

import HeroSection from './components/heroSection';
import GuestNameCheck from './components/guestNameCheck';
import AttendingConfirmation from './components/confirmation/attendingConfirmation';
import GuestsDisplay from './components/guestsDisplay';

import { RsvpPayload } from './types';

export default function Main() {
  const [name, setName] = React.useState('');
  const [nameAvailable, setNameAvailable] = React.useState<boolean | null>(null);
  const [party, setParty] = React.useState<string[]>([]);
  const [rowIndex, setRowIndex] = React.useState<number | null>(null);

  const [attending, setAttending] = React.useState<boolean | null>(null);
  const [plusOne, setPlusOne] = React.useState<boolean | null>(null);
  const [bringingPlusOne, setBringingPlusOne] = React.useState(false);
  const [plusOneFirstName, setPlusOneFirstName] = React.useState('');
  const [plusOneLastName, setPlusOneLastName] = React.useState('');

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

      if (!data.available) alert('Name not found in guest list.');
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
      payload.plusOneFirst = plusOneFirstName;
      payload.plusOneLast = plusOneLastName;
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
    <div className="flex items-center justify-center font-sans">
      <main className="flex w-full flex-col items-center justify-between py-20 px-8 sm:items-start">
        <HeroSection />
        <GuestNameCheck name={name} setName={setName} fetchGuest={fetchGuest} loading={loading} />
        <GuestsDisplay party={party} />
        <AttendingConfirmation
          nameAvailable={nameAvailable}
          attending={attending}
          setAttending={setAttending}
          plusOne={plusOne}
          setBringingPlusOne={setBringingPlusOne}
          bringingPlusOne={bringingPlusOne}
          plusOneFirstName={plusOneFirstName}
          setPlusOneFirstName={setPlusOneFirstName}
          plusOneLastName={plusOneLastName}
          setPlusOneLastName={setPlusOneLastName}
          submitting={submitting}
          handleSubmit={handleSubmit}
        />
      </main>
    </div>
  );
}
