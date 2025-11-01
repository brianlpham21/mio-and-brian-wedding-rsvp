'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './components/header';
import Hero from './components/hero';
import GuestNameCheck from './components/guestNameCheck';
import AttendingConfirmation from './components/confirmation/attendingConfirmation';
import WeddingInfo from './components/weddingInfo';
import ReturnInfo from './components/returnInfo';
import Itinerary from './components/itinerary';
import AdditionalDetails from './components/additionalDetails';
import OurStory from './components/ourStory';
import MaggieIcon from './components/maggieIcon';

import { useTranslation } from '@/hooks/useTranslation';
import { ContactInfo, RsvpPayload } from './types';

/** ---------- LANGUAGE DROPDOWN STATE ---------- */
const languages = [
  { code: 'en', name: 'English', flag: '/us.svg' },
  { code: 'ja', name: '日本語', flag: '/japan.svg' },
  { code: 'vi', name: 'Tiếng Việt', flag: '/vietnam.svg' },
];

export default function Main() {
  const [selectedLang, setSelectedLang] = React.useState(languages[0]);
  const { t } = useTranslation({ locale: selectedLang.code });

  const [name, setName] = React.useState('');
  const [nameAvailable, setNameAvailable] = React.useState<boolean | null>(null);
  const [party, setParty] = React.useState<string[]>([]);
  const [rowIndex, setRowIndex] = React.useState<number | null>(null);
  const [rsvp, setRsvp] = React.useState<string | null>(null);

  const [attending, setAttending] = React.useState<boolean | null>(null);
  const [selectedGuests, setSelectedGuests] = React.useState<string[]>([]);
  const [contactInfo, setContactInfo] = React.useState<ContactInfo>({
    email: '',
    addressLine: '',
    city: '',
    state: '',
    zip: '',
  });
  const [plusOne, setPlusOne] = React.useState<boolean | null>(null);
  const [bringingPlusOne, setBringingPlusOne] = React.useState(false);
  const [plusOneFirstName, setPlusOneFirstName] = React.useState('');
  const [plusOneLastName, setPlusOneLastName] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleStartOver = () => {
    setName('');
    setNameAvailable(null);
    setParty([]);
    setRowIndex(null);
    setRsvp(null);

    setAttending(null);
    setContactInfo({
      email: '',
      addressLine: '',
      city: '',
      state: '',
      zip: '',
    });
    setPlusOne(null);
    setBringingPlusOne(false);
    setPlusOneFirstName('');
    setPlusOneLastName('');

    setLoading(false);
    setSubmitting(false);
    setSubmitted(false);
  };

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
      setSelectedGuests(data.party || []);
      setRowIndex(data.row || null);
      setPlusOne(data.plus_one || null);
      setRsvp(data.rsvp || null);
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

    // Determine guests not attending
    const notAttending = party.filter((name) => !selectedGuests.includes(name));

    const payload: RsvpPayload = {
      rowIndex,
      attending,
      notAttending,
    };

    // Include plus one info if applicable
    if (bringingPlusOne) {
      payload.plusOne = true;
      payload.plusOneFirst = plusOneFirstName;
      payload.plusOneLast = plusOneLastName;
    }

    // Include contact info only if attending
    if (attending && contactInfo) {
      payload.contactInfo = { ...contactInfo };
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

  const headerFont =
    selectedLang.code === 'vi'
      ? { fontSize: 'clamp(3rem, 4vw, 4rem)', fontStyle: 'italic', fontWeight: '500' }
      : { fontFamily: 'Brother, serif', fontSize: 'clamp(4rem, 6vw, 5.5rem)' };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 font-sans text-gray-800">
      <Header selectedLang={selectedLang} setSelectedLang={setSelectedLang} languages={languages} />
      <Hero selectedLang={selectedLang} />
      <WeddingInfo selectedLang={selectedLang} />
      <Itinerary selectedLang={selectedLang} />

      <section id="rsvp" className="w-full py-12 px-6 sm:px-8 md:px-12 bg-pastel-green-25">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-center leading-[1em] mb-3" style={headerFont}>
            {t('rsvp')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">{t('rsvp-subheader')}</p>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={nameAvailable === true ? 'attendingConfirmation' : 'guestNameCheck'}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {nameAvailable === true ? (
                  <AttendingConfirmation
                    selectedLang={selectedLang}
                    nameAvailable={nameAvailable}
                    rsvp={rsvp}
                    party={party}
                    attending={attending}
                    setAttending={setAttending}
                    selectedGuests={selectedGuests}
                    setSelectedGuests={setSelectedGuests}
                    contactInfo={contactInfo}
                    setContactInfo={setContactInfo}
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
                    startOver={handleStartOver}
                  />
                ) : (
                  <GuestNameCheck
                    selectedLang={selectedLang}
                    nameAvailable={nameAvailable}
                    name={name}
                    setName={setName}
                    fetchGuest={fetchGuest}
                    loading={loading}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <OurStory selectedLang={selectedLang} />
      <AdditionalDetails selectedLang={selectedLang} />
      <ReturnInfo selectedLang={selectedLang} />

      <MaggieIcon selectedLang={selectedLang} />
    </div>
  );
}
