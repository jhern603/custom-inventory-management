import Image from 'next/image';
import { useState, useRef } from 'react';
import { OwnerSelectField } from './fields/OwnerSelectField';

export default function Result({ data, inventoryDate, setInventoryDate }) {
  const [defaultOption, setDefaultOption] = useState('');
  const [disabled, setDisabled] = useState(true);
  const new_owner_ref = useRef(null);

  const handleGetOwner = async () => {
    let option;
    const response = await fetch('/api/getEquipmentOwner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data, option),
    });
    const result = await response.json();
    setDefaultOption(result.data);
  };

  const handleUpdate = async () => {
    const date = new Date();
    const today = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    if (
      confirm(
        `This equipment's inventory date will be set to: \n${today}\n is this correct?`
      )
    ) {
      const response = await fetch('/api/updateDate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data, today),
      });
      const result = await response.status;

      if (result === 200) {
        alert('Inventoried date updated successfully!');
        setInventoryDate(today);
      } else
        alert(
          'Inventoried date was not updated!\nCheck that the item has not been surplused and is active in airtable.'
        );
    } else {
      alert('The inventoried date will remain unchanged.');
    }
  };

  const handleEdit = async () => {
    setDisabled(!disabled);
  };

  const handleSubmitEdit = async () => {
    const new_owner_object = {
      new_owner: new_owner_ref.current.value,
      id: data['id'],
    };

    const response = await fetch('/api/updateOwner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(new_owner_object),
    });
    const result = await response.status;
    if (result === 200) {
      alert('Ownership updated successfully!');
      setDisabled(!disabled);
    } else {
      alert('Ownership update failed.');
    }
  };

  if (Object.keys(data).length > 0) {
    handleGetOwner();
    return (
      <>
        <h1>Result for {data['Serial Number']}</h1>
        <input
          type="submit"
          value="Update Inventoried Date"
          onClick={handleUpdate}
        />
        <input
          type="submit"
          value="Edit Ownership"
          onClick={handleEdit}
        />
        {!disabled ? (
          <input
            type="submit"
            value="Submit Change"
            onClick={handleSubmitEdit}
          />
        ) : (
          ''
        )}

        <p>Item description: {data['Manuf/Model']}</p>
        <p>Internal ID: {data['Internal ID']}</p>
        {defaultOption ? (
          <>
            <p>Belongs to:</p>
            <select
              defaultValue={defaultOption}
              ref={new_owner_ref}>
              <OwnerSelectField
                data={data}
                disabled={disabled}
              />
            </select>
          </>
        ) : (
          <p> Getting Programs... </p>
        )}

        <p>Added to inventory: {data['Added']}</p>
        <p>Last Inventoried: {inventoryDate}</p>
        <Image
          src={data['Barcode']}
          width={300}
          height={150}
          alt={`Barcode for ${data['Manuf/Model']}`}
        />
      </>
    );
  }
}
