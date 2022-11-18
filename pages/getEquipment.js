import { GetEquipmentForm } from '../components/forms';
import Result from '../components/equipment_result';
import { useState } from 'react';

export default function Index() {
  const [data, setData] = useState({});
  const [inventoryDate, setInventoryDate] = useState('');

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
