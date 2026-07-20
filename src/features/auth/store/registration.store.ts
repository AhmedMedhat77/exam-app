import { create } from 'zustand';

interface RegistrationStore {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  setFields: (fields: Partial<RegistrationStore>) => void;
}

export const useRegistrationStore = create<RegistrationStore>((set) => ({
  confirmPassword: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  phone: '',
  username: '',
  setFields: (fields) => set(fields),
}));
