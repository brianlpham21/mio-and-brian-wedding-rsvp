export interface RsvpPayload {
  rowIndex: number;
  attending: boolean;
  plusOneFirst?: string;
  plusOneLast?: string;
}

export type GuestsDisplayProps = {
  party: string[];
  startOver: () => void;
};

export type GuestNameCheckProps = {
  nameAvailable: boolean | null;
  name: string;
  setName: (name: string) => void;
  fetchGuest: () => void;
  loading: boolean;
};

export type AttendingConfirmationProps = {
  nameAvailable: boolean | null;
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
  nameAvailable: boolean | null;
  attending: boolean | null;
  submitting: boolean;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
};
