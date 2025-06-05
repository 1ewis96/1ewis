import { useState, useEffect } from 'react';

// This component only renders its children on the client side
// This prevents hydration errors by ensuring content only renders client-side
export default function ClientOnly({ children, fallback = null }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? children : fallback;
}
