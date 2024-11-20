'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const PasswordResetPage = ({ params }: { params: { token: string } }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/password-reset', {
        token: params.token,
        password,
      });
      setSuccess(true);
      setError('');
      alert(response.data.message);
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Reset Your Password</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success ? (
        <p>Your password has been successfully reset. You can now log in.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              New Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default PasswordResetPage;
