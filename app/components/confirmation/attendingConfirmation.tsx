import PlusOneConfirmation from './plusOneConfirmation';
import Submission from './submission';
import SuccessConfirmation from './successConfirmation';
import GuestsDisplay from './guestsDisplay';
import ExistingConfirmation from './existingConfirmation';

import { AttendingConfirmationProps } from '@/app/types';
import { useTranslation } from '@/hooks/useTranslation';

export default function AttendingConfirmation({
  selectedLang,
  nameAvailable,
  rsvp,
  party,
  attending,
  setAttending,
  selectedGuests,
  setSelectedGuests,
  contactInfo,
  setContactInfo,
  plusOne,
  setBringingPlusOne,
  bringingPlusOne,
  plusOneFirstName,
  setPlusOneFirstName,
  plusOneLastName,
  setPlusOneLastName,
  submitting,
  handleSubmit,
  submitted,
  startOver,
}: AttendingConfirmationProps) {
  const { t } = useTranslation({ locale: selectedLang.code });

  if (!nameAvailable) return null;

  if (submitted) return <SuccessConfirmation selectedLang={selectedLang} startOver={startOver} />;
  if (rsvp) return <ExistingConfirmation selectedLang={selectedLang} startOver={startOver} />;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm px-6 py-8 text-gray-800">
      <GuestsDisplay
        attending={attending}
        selectedLang={selectedLang}
        party={party}
        selectedGuests={selectedGuests}
        setSelectedGuests={setSelectedGuests}
      />

      {/* Attendance Selection */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="attending"
            value="yes"
            checked={attending === true}
            onChange={() => setAttending(true)}
            className="h-4 w-4 text-pastel-green-250 focus:ring-pink-300"
          />
          <span className="text-sm sm:text-base">{t('attending')}</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="attending"
            value="no"
            checked={attending === false}
            onChange={() => setAttending(false)}
            className="h-4 w-4 text-pastel-green-250 focus:ring-pink-300"
          />
          <span className="text-sm sm:text-base">{t('not-attending')}</span>
        </label>
      </div>

      {/* Plus One Section */}
      <div className="mb-6">
        <PlusOneConfirmation
          attending={attending}
          plusOne={plusOne}
          setBringingPlusOne={setBringingPlusOne}
          bringingPlusOne={bringingPlusOne}
          plusOneFirstName={plusOneFirstName}
          setPlusOneFirstName={setPlusOneFirstName}
          plusOneLastName={plusOneLastName}
          setPlusOneLastName={setPlusOneLastName}
        />
      </div>

      {/* Contact Info */}
      {attending && (
        <div className="space-y-4 mb-6">
          <p className="text-sm text-gray-700 text-center mb-2">{t('contact-info-message')}</p>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t('email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={t('enter-your-email')}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
              value={contactInfo.email}
              onChange={(e) => setContactInfo((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>

          {/* Address Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('address')}</label>

            {/* Address Line */}
            <input
              type="text"
              id="address-line"
              name="address-line"
              placeholder={t('street-address')}
              className="w-full rounded-md border border-gray-300 px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
              value={contactInfo.addressLine}
              onChange={(e) => setContactInfo((prev) => ({ ...prev, addressLine: e.target.value }))}
            />

            {/* City, State, Zip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                id="city"
                name="city"
                placeholder={t('city')}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                required
                value={contactInfo.city}
                onChange={(e) => setContactInfo((prev) => ({ ...prev, city: e.target.value }))}
              />
              <input
                type="text"
                id="state"
                name="state"
                placeholder={t('state')}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                required
                value={contactInfo.state}
                onChange={(e) => setContactInfo((prev) => ({ ...prev, state: e.target.value }))}
              />
              <input
                type="text"
                id="zip"
                name="zip"
                placeholder={t('zip')}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                required
                value={contactInfo.zip}
                onChange={(e) => setContactInfo((prev) => ({ ...prev, zip: e.target.value }))}
              />
            </div>
          </div>
        </div>
      )}

      {/* Submission Button */}
      <div className="flex justify-center">
        <Submission
          selectedLang={selectedLang}
          nameAvailable={nameAvailable}
          attending={attending}
          contactInfo={contactInfo}
          submitting={submitting}
          handleSubmit={handleSubmit}
          startOver={startOver}
        />
      </div>
    </div>
  );
}
