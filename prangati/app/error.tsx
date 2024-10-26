'use client';

import { useEffect } from 'react';

import Header from '@/components/Header/Headerpage';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div>
      <Header />
    </div>
  );
}
