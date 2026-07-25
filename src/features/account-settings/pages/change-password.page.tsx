import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

export default function UserChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change logic
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col justify-between space-y-6">
      <div className="space-y-5 max-w-lg">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
          <p className="text-sm text-gray-500">Ensure your account is using a strong password.</p>
        </div>

        {/* Current Password */}
        <div className="space-y-1.5">
          <label htmlFor="currentPassword" className="text-xs font-semibold uppercase tracking-wider text-gray-700">
            Current Password
          </label>
          <Input
            id="currentPassword"
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="bg-white"
          />
        </div>

        {/* New Password */}
        <div className="space-y-1.5">
          <label htmlFor="newPassword" className="text-xs font-semibold uppercase tracking-wider text-gray-700">
            New Password
          </label>
          <Input
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-white"
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="text-xs font-semibold uppercase tracking-wider text-gray-700">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-white"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end pt-6 border-t border-gray-100">
        <Button
          type="submit"
          className="w-auto bg-[#1768FF] text-white hover:bg-blue-700 font-medium px-8 py-2.5 rounded-lg border-0"
        >
          Save Password
        </Button>
      </div>
    </form>
  );
}
