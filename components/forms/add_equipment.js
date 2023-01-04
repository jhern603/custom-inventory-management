import { TextFields, SelectField } from '../fields';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const AddEquipmentForm = () => {
  let populated_fields = {};
  const fields = require('../../conf.json')['fields'];
  const ownership_list = require('../../conf.json')['ownership_list'];
  const type_list = require('../../conf.json')['type_list'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    fields.forEach((field) => {
      populated_fields[field] = form[field].value;
    });

    const response = await fetch('/api/addEquipment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(populated_fields),
    });
    const result = await response.json();
    if (result) alert('Equipment Successfully added to invnetory!');
    else alert('There was a problem adding the equipment to invnetory!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextFields fields={fields} />
      <SelectField
        list={ownership_list}
        field={fields[2]}
      />
      <SelectField
        list={type_list}
        field={fields[4]}
      />
      <br />
      <Button
        variant="outlined"
        type="submit">
        Add to Inventory
      </Button>
    </form>
  );
};

export { AddEquipmentForm };
