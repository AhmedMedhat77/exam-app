import { Pencil } from 'lucide-react';
import { useState } from 'react';
import CustomPhoneInput from '@/shared/ui/phone-input';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

export default function UserProfilePage() {
  const [firstName, setFirstName] = useState('Ahmed');
  const [lastName, setLastName] = useState('Abdullah');
  const [username] = useState('user123');
  const [email, setEmail] = useState('user@example.com');
  const [phone, setPhone] = useState<string | undefined>('+201012345678');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col justify-between space-y-6"
    >
      <div className="space-y-5 px-4 py-5">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="firstName"
              className="text-xs font-semibold tracking-wider text-gray-700 uppercase"
            >
              First name
            </label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="lastName"
              className="text-xs font-semibold tracking-wider text-gray-700 uppercase"
            >
              Last name
            </label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white"
            />
          </div>
        </div>

        {/* Username */}
        <div className="space-y-1.5">
          <label
            htmlFor="username"
            className="text-xs font-semibold tracking-wider text-gray-700 uppercase"
          >
            Username
          </label>
          <Input
            id="username"
            type="text"
            value={username}
            disabled
            className="cursor-not-allowed bg-gray-100/80 font-mono text-sm text-gray-600"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="email"
              className="text-xs font-semibold tracking-wider text-gray-700 uppercase"
            >
              Email
            </label>
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1 text-xs font-medium text-[#1768FF] hover:underline"
            >
              <Pencil className="size-3" />
              <span>Change</span>
            </button>
          </div>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label
            htmlFor="phone"
            className="text-xs font-semibold tracking-wider text-gray-700 uppercase"
          >
            Phone
          </label>
          <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
            <CustomPhoneInput
              id="phone"
              defaultCountry="EG"
              value={phone}
              onChange={(val) => setPhone(val ? String(val) : '')}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-6">
        <Button
          type="button"
          variant="destructive"
          className="w-auto rounded-lg border-0 bg-red-50 px-6 py-2.5 font-medium text-red-500 hover:bg-red-100 hover:text-red-600"
        >
          Delete My Account
        </Button>
        <Button
          type="submit"
          className="w-auto rounded-lg border-0 bg-[#1768FF] px-8 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}
