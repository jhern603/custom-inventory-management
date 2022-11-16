import { CheckoutForm, GetEquipmentForm } from '../components/forms';
import { useState } from 'react'


//get Equipment should return a table of equipment by type first, then manuf/model, then serial number
export default function Index() {
  const [data, setData] = useState({});
  const ConditionalForm = () => {
    if (Object.keys(data).length > 0)
      return (<CheckoutForm data={data} setData={setData} />)
    return (< GetEquipmentForm setData={setData} />)
  }
  return (
    <div className="body">
      <ConditionalForm />
    </div>
  )
}