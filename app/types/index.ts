export type HeaderProps = {
  selectedLang: { code: string; name: string; flag: string };
  setSelectedLang: React.Dispatch<
    React.SetStateAction<{ code: string; name: string; flag: string }>
  >;
  languages: { code: string; name: string; flag: string }[];
};

export type HeroProps = {
  selectedLang: { code: string; name: string; flag: string };
};

export interface RsvpPayload {
  rowIndex: number;
  attending: boolean;
  plusOne?: boolean;
  plusOneFirst?: string;
  plusOneLast?: string;
  contactInfo?: ContactInfo;
  notAttending: string[];
}

export type GuestsDisplayProps = {
  attending: boolean | null;
  selectedLang: { code: string; name: string; flag: string };
  party: string[];
  selectedGuests: string[];
  setSelectedGuests: React.Dispatch<React.SetStateAction<string[]>>;
};

export type GuestNameCheckProps = {
  selectedLang: { code: string; name: string; flag: string };
  nameAvailable: boolean | null;
  name: string;
  setName: (name: string) => void;
  fetchGuest: () => void;
  loading: boolean;
};

export interface ContactInfo {
  email: string;
  addressLine: string;
  city: string;
  state: string;
  zip: string;
}

export type AttendingConfirmationProps = {
  selectedLang: { code: string; name: string; flag: string };
  nameAvailable: boolean | null;
  rsvp: string | null;
  party: string[];
  attending: boolean | null;
  setAttending: (attending: boolean) => void;
  selectedGuests: string[];
  setSelectedGuests: React.Dispatch<React.SetStateAction<string[]>>;
  contactInfo: ContactInfo;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>;
  plusOne: boolean | null;
  setBringingPlusOne: (bringing: boolean) => void;
  bringingPlusOne: boolean;
  plusOneFirstName: string;
  setPlusOneFirstName: (name: string) => void;
  plusOneLastName: string;
  setPlusOneLastName: (name: string) => void;
  submitting: boolean;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  submitted: boolean;
  startOver: () => void;
};

export type PlusOneConfirmationProps = {
  attending: boolean | null;
  plusOne: boolean | null;
  setBringingPlusOne: (bringing: boolean) => void;
  bringingPlusOne: boolean;
  plusOneFirstName: string;
  setPlusOneFirstName: (name: string) => void;
  plusOneLastName: string;
  setPlusOneLastName: (name: string) => void;
};

export type SubmissionProps = {
  selectedLang: { code: string; name: string; flag: string };
  nameAvailable: boolean | null;
  attending: boolean | null;
  noGuestsSelected: boolean;
  contactInfo: ContactInfo;
  submitting: boolean;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  startOver: () => void;
};
