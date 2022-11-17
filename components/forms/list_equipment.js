import { useState } from 'react';

const EquipmentTable = ({ data, setData }) => {
  const [equipmentData, setEquipmentData] = useState([]);
  const [item, setItem] = useState('');
  const [selected, setSelected] = useState(false);
  let textbox_conents = '';
  const handleItem = (e) => {
    setItem(e.target.id);
    setSelected(true);
  };
  const handleChange = (event) => {
    if (event.keyCode === 13) handleSearch(textbox_conents);
    textbox_conents =
      event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1);
  };

  const handleSearch = async () => {
    if (textbox_conents.includes('All') || textbox_conents.length >= 5) {
      const response = await fetch('/api/listEquipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(textbox_conents),
      });
      const result = await response.json();
      setEquipmentData(result.data);
    }
  };

  const handleCheckout = (e) => {
    equipmentData.map((equipment) => {
      if (equipment['Serial Number'] === item) setData(equipment);
    });
  };
  return (
    <div>
      <input
        type="text"
        name="filter"
        placeholder="Filter by type..."
        onKeyUp={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
      {selected ? (
        <button onClick={handleCheckout}>Select for Checkout</button>
      ) : (
        ''
      )}
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
              <td>{record['Type']}</td>
              <td>{record['Manuf/Model']}</td>
              <td>{record['Serial Number']}</td>
              <input
                type="radio"
                name="item_radio"
                id={record['Serial Number']}
                onClick={handleItem}
              />
              <span>Select For Checkout</span>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { EquipmentTable };
