import { GetEquipmentForm } from '../components/forms';
import Result from '../components/equipment_result'
import { useState } from 'react'

export default function Index() {
  const [data, setData] = useState({});
  return (
    <div className="body">
      <GetEquipmentForm data={data} setData={setData} />
      <Result data={data} />
    </div>
  )
}