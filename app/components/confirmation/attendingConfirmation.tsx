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

  const noGuestsSelected = selectedGuests.length === 0;

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

              <div className="relative w-full">
                <select
                  id="state"
                  name="state"
                  required
                  value={contactInfo.state}
                  onChange={(e) => setContactInfo((prev) => ({ ...prev, state: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white appearance-none cursor-pointer"
                >
                  <option value="">{t('state')}</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>

                {/* Custom arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    className="h-4 w-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

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
          noGuestsSelected={noGuestsSelected}
          contactInfo={contactInfo}
          submitting={submitting}
          handleSubmit={handleSubmit}
          startOver={startOver}
        />
      </div>
    </div>
  );
}
