export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: string;
  createdAt?: string;
}
