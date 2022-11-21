import {
  CheckoutForm,
  EquipmentTable,
} from '../components/forms';
import { useState } from 'react';


export default function Index() {
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
  return (
    <div className="body">
      <ConditionalForm />
    </div>
  );
}
