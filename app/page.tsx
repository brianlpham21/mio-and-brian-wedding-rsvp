'use client';

import React from 'react';

import HeroSection from './components/heroSection';
import GuestNameCheck from './components/guestNameCheck';
import AttendingConfirmation from './components/confirmation/attendingConfirmation';

import { RsvpPayload } from './types';
import WeddingInfoSection from './components/weddingInfoSection';
import ReturnInfoSection from './components/returnInfoSection';

export default function Main() {
  const [name, setName] = React.useState('');
  const [nameAvailable, setNameAvailable] = React.useState<boolean | null>(null);
  const [party, setParty] = React.useState<string[]>([]);
  const [rowIndex, setRowIndex] = React.useState<number | null>(null);
  const [rsvp, setRsvp] = React.useState<string | null>(null);

  const [attending, setAttending] = React.useState<boolean | null>(null);
  const [plusOne, setPlusOne] = React.useState<boolean | null>(null);
  const [bringingPlusOne, setBringingPlusOne] = React.useState(false);
  const [plusOneFirstName, setPlusOneFirstName] = React.useState('');
  const [plusOneLastName, setPlusOneLastName] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

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
      setRsvp(data.rsvp || null);

      if (!data.available) alert('Name not found in guest list.');
    } catch (err) {
      console.error(err);
      alert('Error checking name.');
    } finally {
      setName('');
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
      payload.plusOne = true;
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
        setSubmitted(true);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 font-sans text-gray-800">
      <HeroSection />
      <WeddingInfoSection />
      <main className="flex flex-col w-full max-w-2xl px-6 py-12 sm:px-8 md:px-10">
        <GuestNameCheck
          nameAvailable={nameAvailable}
          name={name}
          setName={setName}
          fetchGuest={fetchGuest}
          loading={loading}
        />
        <AttendingConfirmation
          nameAvailable={nameAvailable}
          rsvp={rsvp}
          party={party}
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
          submitted={submitted}
        />
      </main>
      <ReturnInfoSection />
    </div>
  );
}
