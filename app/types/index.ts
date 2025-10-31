export type HeroProps = {
  selectedLang: { code: string; name: string; flag: string };
  setSelectedLang: React.Dispatch<
    React.SetStateAction<{ code: string; name: string; flag: string }>
  >;
  languages: { code: string; name: string; flag: string }[];
};

export interface RsvpPayload {
  rowIndex: number;
  attending: boolean;
  plusOne?: boolean;
  plusOneFirst?: string;
  plusOneLast?: string;
}

export type GuestsDisplayProps = {
  selectedLang: { code: string; name: string; flag: string };
  party: string[];
};

export type GuestNameCheckProps = {
  selectedLang: { code: string; name: string; flag: string };
  nameAvailable: boolean | null;
  name: string;
  setName: (name: string) => void;
  fetchGuest: () => void;
  loading: boolean;
};

export type AttendingConfirmationProps = {
  selectedLang: { code: string; name: string; flag: string };
  nameAvailable: boolean | null;
  rsvp: string | null;
  party: string[];
  attending: boolean | null;
  setAttending: (attending: boolean) => void;
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
  submitting: boolean;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  startOver: () => void;
};
