import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CheckoutForm, EquipmentTable } from '../components/forms';
import { auth } from '../components/firebase';

export default function Index() {
  const router = useRouter();
  const [authState, setAuthState] = useState(false);
  const [data, setData] = useState({});
  const ConditionalForm = () => {
    if (Object.keys(data).length > 0)
      return (
        <CheckoutForm
          data={data}
          setData={setData}
        />
      );
    return (
      <EquipmentTable
        data={data}
        setData={setData}
      />
    );
  };
  
  if (!authState && auth.currentUser) {
    setAuthState(true);
  }
  useEffect(() => {
    if (!authState) router.push('/');
  });

  return (
    <div className="body">
      <ConditionalForm />
    </div>
  );
}
