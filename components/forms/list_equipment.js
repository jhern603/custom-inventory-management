import { useState } from 'react';

const EquipmentTable = ({ setData }) => {
  const conf = require('../../conf.json');
  const [equipmentData, setEquipmentData] = useState([]);
  const [item, setItem] = useState('');
  const [selected, setSelected] = useState(false);
  const handleItem = (e) => {
    setItem(e.target.id);
    setSelected(true);
  };

  const handleSearch = async (event) => {
    const response = await fetch('/api/listEquipment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event.target.value),
    });
    const result = await response.json();
    setEquipmentData(result.data);
  };

  const handleCheckout = (e) => {
    equipmentData.map((equipment) => {
      if (equipment['Serial Number'] === item) setData(equipment);
    });
  };
  return (
    <div>
      {selected ? (
        <button onClick={handleCheckout}>Continue To Checkout</button>
      ) : (
        ''
      )}
      <>
        <p>Filter by Type:</p>
        <select
          defaultValue="All"
          onChange={handleSearch}>
          <option key="All">All</option>
          {conf.type_list.map((type) => {
            return <option key={type}>{type}</option>;
          })}
        </select>
      </>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Manuf/Model</th>
            <th>Serial Number</th>
          </tr>
        </thead>

        <tbody>
          {equipmentData.map((record) => (
            <tr>
              <td key={record['Type']}>{record['Type']}</td>
              <td key={record['Manuf/Model']}>{record['Manuf/Model']}</td>
              <td key={record['Serial Number']}>{record['Serial Number']}</td>
              <input
                type="radio"
                name="item_radio"
                id={record['Serial Number']}
                onClick={handleItem}
              />
              Select For Checkout
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { EquipmentTable };
