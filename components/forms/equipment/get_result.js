import Image from 'next/image';
import { useState, useRef } from 'react';
import { OwnerSelectField } from '../../fields';
import { Button, Typography, InputLabel, Select } from '@mui/material';

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
        <br />
        <Typography variant='h6'>Result for {data['Serial Number']}</Typography>
        <Button
          type="submit"
          variant="outlined"
          onClick={handleUpdate}>
          Update Inventoried Date
        </Button>
        {!disabled ? (
          <>
            <Button
              type="submit"
              variant="outlined"
              onClick={() => setDisabled(!disabled)}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outlined"
              onClick={handleSubmitEdit}>
              Submit Change
            </Button>
          </>
        ) : (
          <Button
            type="submit"
            variant="outlined"
            onClick={() => setDisabled(!disabled)}>
            Edit Ownership
          </Button>
        )}

        <Typography>Item description: {data['Manuf/Model']}</Typography>
        <Typography>Internal ID: {data['Internal ID']}</Typography>
        {defaultOption ? (
          <>
            <InputLabel>Belongs to:</InputLabel>
            <Select
              selected={defaultOption}
              ref={new_owner_ref}>
              <OwnerSelectField
                data={data}
                disabled={disabled}
              />
            </Select>
          </>
        ) : (
          <Typography> Getting Programs... </Typography>
        )}

        <Typography>Added to inventory: {data['Added']}</Typography>
        <Typography>Last Inventoried: {inventoryDate}</Typography>
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
