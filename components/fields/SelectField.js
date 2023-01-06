import { useState } from 'react';
import { InputLabel, Select, MenuItem } from '@mui/material';
const SelectField = ({ list, field }) => {
  const [selectState, setSelectState] = useState(list[0]);
  const handleChange = (e) => {
    setSelectState(e.target.value);
  };

  return (
    <>
      <br />
      <InputLabel htmlFor={field}>{field}:</InputLabel>
      <Select
        variant="standard"
        name={field}
        onChange={handleChange}
        value={selectState}>
        {list.map((item) => {
          return (
            <MenuItem
              key={item}
              value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};
export { SelectField };
