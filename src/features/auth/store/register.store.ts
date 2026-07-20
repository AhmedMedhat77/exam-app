import { create } from 'zustand';

interface ICreateAccountStore {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  setFields: (fields: Partial<ICreateAccountStore>) => void;
}

export const useRegisterStore = create<ICreateAccountStore>((set) => ({
  confirmPassword: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  phone: '',
  username: '',
  setFields: (fields) => set(fields),
}));
