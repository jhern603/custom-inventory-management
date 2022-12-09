import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetEquipmentForm } from '../../components/forms';
import { auth } from '../../components/firebase';
import Result from '../../components/equipment_result';

export default function Index() {
  const router = useRouter();
  const [authState, setAuthState] = useState(false);
  const [data, setData] = useState({});
  const [inventoryDate, setInventoryDate] = useState('');

  if (!authState && auth.currentUser) {
    setAuthState(true);
  }
  useEffect(() => {
    if (!authState) router.push('/');
  });

  return (
    <div className="body">
      <GetEquipmentForm
        setData={setData}
        setInventoryDate={setInventoryDate}
      />

      <Result
        data={data}
        inventoryDate={inventoryDate}
        setInventoryDate={setInventoryDate}
      />
    </div>
  );
}
