import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel } from '@mui/material';

const EquipmentTable = ({ setData }) => {
  const conf = require('../../conf.json');
  const [equipmentData, setEquipmentData] = useState([]);
  const [item, setItem] = useState('');
  const [selected, setSelected] = useState(false);
  const [selectState, setSelectState] = useState();
  const [count, setCount] = useState(0);

  const handleItem = (e) => {
    setItem(e.target.id);
    setSelected(true);
  };

  const handleSearch = async (event) => {
    setSelectState(event.target.value);
    const response = await fetch('/api/listEquipment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event.target.value),
    });
    const result = await response.json();
    setEquipmentData(result.data);
    setCount(result.data.length);
  };

  const handleCheckout = (e) => {
    equipmentData.map((equipment) => {
      if (equipment['Serial Number'] === item) setData(equipment);
    });
  };

  return (
    <>
      {selected ? (
        <button onClick={handleCheckout}>Continue To Checkout</button>
      ) : (
        ''
      )}
      <>
        <InputLabel htmlFor="filter">Filter by Type:</InputLabel>
        <Select
          variant="standard"
          name="filter"
          onChange={handleSearch}
          value={selectState ? selectState : 'All'}>
          <MenuItem
            key="All"
            value="All">
            All
          </MenuItem>
          {conf.type_list.map((item) => {
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell>Select for Checkout</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Manuf/Model</TableCell>
            <TableCell>Serial Number</TableCell>
          </TableHead>

          <TableBody>
            {equipmentData.map((record) => {
              return (
                <TableRow>
                  <TableCell>
                    <Radio
                      name="item_radio"
                      id={record['Serial Number']}
                      onChange={handleItem}
                      checked={item === record['Serial Number']}
                    />
                  </TableCell>
                  <TableCell key={record['Type']}>{record['Type']}</TableCell>
                  <TableCell key={record['Manuf/Model']}>
                    {record['Manuf/Model']}
                  </TableCell>
                  <TableCell key={record['Serial Number']}>
                    {record['Serial Number']}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <p>Total Count: {count}</p>
    </>
  );
};

export { EquipmentTable };
