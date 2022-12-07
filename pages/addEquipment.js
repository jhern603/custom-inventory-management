import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AddEquipmentForm } from '../components/forms';
import { auth } from '../components/firebase';

export default function Index() {
  const router = useRouter();
  const [authState, setAuthState] = useState(false);

  if (!authState && auth.currentUser) {
    setAuthState(true);
  }
  useEffect(() => {
    if (!authState) router.push('/');
  });

  return (
    <div className="body">
      <AddEquipmentForm />
    </div>
  );
}
